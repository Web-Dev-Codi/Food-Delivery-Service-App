// src/context/CartContext.jsx
import { createContext, useContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const CartContext = createContext();

// Define action types
const ACTIONS = {
	SET_CART: "SET_CART",
	ADD_TO_CART: "ADD_TO_CART",
	REMOVE_FROM_CART: "REMOVE_FROM_CART",
	UPDATE_QUANTITY: "UPDATE_QUANTITY",
	CLEAR_CART: "CLEAR_CART",
	SET_LOADING: "SET_LOADING",
	SET_ERROR: "SET_ERROR",
};

// Get initial state from localStorage or use default
const getInitialState = () => {
	try {
		const savedCart = localStorage.getItem("cart");
		return savedCart
			? JSON.parse(savedCart)
			: {
					items: [],
					total: 0,
					loading: false,
					error: null,
			  };
	} catch (error) {
		console.error("Error reading cart from localStorage:", error);
		return {
			items: [],
			total: 0,
			loading: false,
			error: null,
		};
	}
};

// Helper function to calculate total
const calculateTotal = (items) => {
	return Number(
		items
			.reduce((total, item) => total + item.price * item.quantity, 0)
			.toFixed(2)
	);
};

// Reducer function
const cartReducer = (state, action) => {
	let newState;

	switch (action.type) {
		case ACTIONS.SET_CART:
			newState = {
				...state,
				items: action.payload,
				total: calculateTotal(action.payload),
				loading: false,
				error: null,
			};
			break;
		case ACTIONS.ADD_TO_CART:
			const existingItem = state.items.find(
				(item) => item._id === action.payload._id
			);
			let updatedItems;
			if (existingItem) {
				updatedItems = state.items.map((item) =>
					item._id === action.payload._id
						? {
								...item,
								quantity:
									item.quantity + action.payload.quantity,
						  }
						: item
				);
			} else {
				updatedItems = [...state.items, action.payload];
			}
			newState = {
				...state,
				items: updatedItems,
				total: calculateTotal(updatedItems),
				loading: false,
				error: null,
			};
			break;
		case ACTIONS.REMOVE_FROM_CART:
			const filteredItems = state.items.filter(
				(item) => item._id !== action.payload
			);
			newState = {
				...state,
				items: filteredItems,
				total: calculateTotal(filteredItems),
				loading: false,
				error: null,
			};
			break;
		case ACTIONS.UPDATE_QUANTITY:
			const updatedCartItems = state.items.map((item) =>
				item._id === action.payload.itemId
					? { ...item, quantity: action.payload.quantity }
					: item
			);
			newState = {
				...state,
				items: updatedCartItems,
				total: calculateTotal(updatedCartItems),
				loading: false,
				error: null,
			};
			break;
		case ACTIONS.CLEAR_CART:
			newState = {
				...state,
				items: [],
				total: 0,
				loading: false,
				error: null,
			};
			break;
		case ACTIONS.SET_LOADING:
			newState = {
				...state,
				loading: action.payload,
			};
			break;
		case ACTIONS.SET_ERROR:
			newState = {
				...state,
				error: action.payload,
				loading: false,
			};
			break;
		default:
			return state;
	}

	// Save to localStorage after each state change
	try {
		localStorage.setItem("cart", JSON.stringify(newState));
	} catch (error) {
		console.error("Error saving cart to localStorage:", error);
	}

	return newState;
};

// Cart Provider component
export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, getInitialState());

	// API base URL
	const API_URL = "http://localhost:8000/api/cart";

	// Get auth token
	const getAuthHeader = () => {
		const token = localStorage.getItem("token");
		return token
			? {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
			  }
			: null;
	};

	// Load cart from database when component mounts or token changes
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			fetchCart();
		}
	}, []);

	// Sync cart with database whenever it changes
	useEffect(() => {
		const syncCartWithDatabase = async () => {
			const headers = getAuthHeader();
			if (!headers) return; // Skip if not authenticated

			if (state.items.length > 0 && !state.loading) {
				try {
					await axios.post(
						`${API_URL}/sync`,
						{ items: state.items },
						{ headers }
					);
				} catch (error) {
					console.error("Error syncing cart with database:", error);
					// Don't set error state here as it's a background sync
				}
			}
		};

		syncCartWithDatabase();
	}, [state.items]);

	// Fetch cart items from backend
	const fetchCart = async () => {
		const headers = getAuthHeader();
		if (!headers) return; // Skip if not authenticated

		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			dispatch({ type: ACTIONS.SET_ERROR, payload: null });

			const response = await axios.get(API_URL, { headers });

			if (response.data && Array.isArray(response.data.items)) {
				dispatch({
					type: ACTIONS.SET_CART,
					payload: response.data.items,
				});
			} else {
				console.error("Invalid cart data format:", response.data);
				dispatch({
					type: ACTIONS.SET_ERROR,
					payload: "Invalid cart data received from server",
				});
			}
		} catch (error) {
			console.error("Cart fetch error:", error);
			if (error.response?.status === 401) {
				// Handle unauthorized error silently
				return;
			}
			dispatch({
				type: ACTIONS.SET_ERROR,
				payload: "Error fetching cart. Please try again later.",
			});
		} finally {
			dispatch({ type: ACTIONS.SET_LOADING, payload: false });
		}
	};

	// Add item to cart
	const addToCart = async (item) => {
		const headers = getAuthHeader();

		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			dispatch({ type: ACTIONS.SET_ERROR, payload: null });

			if (headers) {
				// If authenticated, add to database
				await axios.post(
					`${API_URL}/add`,
					{
						menuItemId: item._id,
						quantity: item.quantity,
					},
					{ headers }
				);
			}

			// Update local state regardless of authentication
			dispatch({
				type: ACTIONS.ADD_TO_CART,
				payload: item,
			});
		} catch (error) {
			console.error("Add to cart error:", error);
			dispatch({
				type: ACTIONS.SET_ERROR,
				payload: "Error adding item to cart. Please try again.",
			});
		} finally {
			dispatch({ type: ACTIONS.SET_LOADING, payload: false });
		}
	};

	// Update item quantity
	const updateQuantity = async (itemId, quantity) => {
		const headers = getAuthHeader();

		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			dispatch({ type: ACTIONS.SET_ERROR, payload: null });

			if (headers) {
				// If authenticated, update in database
				await axios.put(
					`${API_URL}/update-quantity`,
					{
						menuItemId: itemId,
						quantity,
					},
					{ headers }
				);
			}

			dispatch({
				type: ACTIONS.UPDATE_QUANTITY,
				payload: { itemId, quantity },
			});
		} catch (error) {
			console.error("Update quantity error:", error);
			dispatch({
				type: ACTIONS.SET_ERROR,
				payload: "Error updating quantity. Please try again.",
			});
		} finally {
			dispatch({ type: ACTIONS.SET_LOADING, payload: false });
		}
	};

	// Remove item from cart
	const removeFromCart = async (itemId) => {
		const headers = getAuthHeader();

		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			dispatch({ type: ACTIONS.SET_ERROR, payload: null });

			if (headers) {
				// If authenticated, remove from database
				await axios.delete(`${API_URL}/remove/${itemId}`, { headers });
			}

			dispatch({
				type: ACTIONS.REMOVE_FROM_CART,
				payload: itemId,
			});
		} catch (error) {
			console.error("Remove from cart error:", error);
			dispatch({
				type: ACTIONS.SET_ERROR,
				payload: "Error removing item from cart. Please try again.",
			});
		} finally {
			dispatch({ type: ACTIONS.SET_LOADING, payload: false });
		}
	};

	// Clear cart
	const clearCart = async () => {
		const headers = getAuthHeader();

		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			dispatch({ type: ACTIONS.SET_ERROR, payload: null });

			if (headers) {
				// If authenticated, clear in database
				await axios.delete(`${API_URL}/clear`, { headers });
			}

			dispatch({ type: ACTIONS.CLEAR_CART });
		} catch (error) {
			console.error("Clear cart error:", error);
			dispatch({
				type: ACTIONS.SET_ERROR,
				payload: "Error clearing cart. Please try again.",
			});
		} finally {
			dispatch({ type: ACTIONS.SET_LOADING, payload: false });
		}
	};

	return (
		<CartContext.Provider
			value={{
				...state,
				addToCart,
				removeFromCart,
				updateQuantity,
				clearCart,
			}}>
			{children}
		</CartContext.Provider>
	);
};

CartProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

// Custom hook to use cart context
export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
};
