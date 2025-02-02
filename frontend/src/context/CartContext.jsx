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
	return items.reduce((total, item) => total + item.price * item.quantity, 0);
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
			};
			break;
		case ACTIONS.ADD_TO_CART:
			newState = {
				...state,
				items: [...state.items, action.payload],
				total: calculateTotal([...state.items, action.payload]),
			};
			break;
		case ACTIONS.REMOVE_FROM_CART:
			newState = {
				...state,
				items: state.items.filter(
					(item) => item._id !== action.payload
				),
				total: calculateTotal(
					state.items.filter((item) => item._id !== action.payload)
				),
			};
			break;
		case ACTIONS.UPDATE_QUANTITY:
			newState = {
				...state,
				items: state.items.map((item) =>
					item._id === action.payload.itemId
						? { ...item, quantity: action.payload.quantity }
						: item
				),
				total: calculateTotal(
					state.items.map((item) =>
						item._id === action.payload.itemId
							? { ...item, quantity: action.payload.quantity }
							: item
					)
				),
			};
			break;
		case ACTIONS.CLEAR_CART:
			newState = {
				...state,
				items: [],
				total: 0,
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
		if (!token) {
			throw new Error("No authentication token found");
		}
		return {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		};
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
			if (state.items.length > 0 && !state.loading) {
				try {
					await axios.post(
						`${API_URL}/sync`,
						{ items: state.items },
						{
							headers: getAuthHeader(),
						}
					);
				} catch (error) {
					console.error("Error syncing cart with database:", error);
				}
			}
		};

		syncCartWithDatabase();
	}, [state.items]);

	// Fetch cart items from backend
	const fetchCart = async () => {
		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			dispatch({ type: ACTIONS.SET_ERROR, payload: null });

			const response = await axios.get(`${API_URL}`, {
				headers: getAuthHeader(),
			});

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
			dispatch({
				type: ACTIONS.SET_ERROR,
				payload:
					error.response?.data?.message ||
					"Error fetching cart. Please make sure you are logged in.",
			});
			// Clear cart if unauthorized
			if (error.response?.status === 401) {
				dispatch({ type: ACTIONS.CLEAR_CART });
				localStorage.removeItem("cart"); // Clear localStorage cart on auth error
			}
		} finally {
			dispatch({ type: ACTIONS.SET_LOADING, payload: false });
		}
	};

	// Add item to cart
	const addToCart = async (menuItem) => {
		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			dispatch({ type: ACTIONS.SET_ERROR, payload: null });

			const cartItem = {
				menuItem: menuItem._id,
				quantity: 1,
				price: menuItem.price,
			};

			const response = await axios.post(`${API_URL}/add`, cartItem, {
				headers: getAuthHeader(),
			});

			dispatch({ type: ACTIONS.ADD_TO_CART, payload: response.data });
		} catch (error) {
			console.error("Add to cart error:", error);
			dispatch({
				type: ACTIONS.SET_ERROR,
				payload:
					error.response?.data?.message ||
					"Failed to add item to cart",
			});
		} finally {
			dispatch({ type: ACTIONS.SET_LOADING, payload: false });
		}
	};

	// Remove item from cart
	const removeFromCart = async (menuItemId) => {
		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			dispatch({ type: ACTIONS.SET_ERROR, payload: null });

			await axios.delete(`${API_URL}/remove/${menuItemId}`, {
				headers: getAuthHeader(),
			});

			dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: menuItemId });
		} catch (error) {
			console.error("Remove from cart error:", error);
			dispatch({
				type: ACTIONS.SET_ERROR,
				payload:
					error.response?.data?.message ||
					"Failed to remove item from cart",
			});
		} finally {
			dispatch({ type: ACTIONS.SET_LOADING, payload: false });
		}
	};

	// Update item quantity
	const updateQuantity = async (menuItemId, quantity) => {
		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			dispatch({ type: ACTIONS.SET_ERROR, payload: null });

			await axios.put(
				`${API_URL}/update-quantity`,
				{ menuItemId, quantity },
				{
					headers: getAuthHeader(),
				}
			);

			dispatch({
				type: ACTIONS.UPDATE_QUANTITY,
				payload: { itemId: menuItemId, quantity },
			});
		} catch (error) {
			console.error("Update quantity error:", error);
			dispatch({
				type: ACTIONS.SET_ERROR,
				payload:
					error.response?.data?.message ||
					"Failed to update quantity",
			});
		} finally {
			dispatch({ type: ACTIONS.SET_LOADING, payload: false });
		}
	};

	// Clear cart
	const clearCart = async () => {
		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			dispatch({ type: ACTIONS.SET_ERROR, payload: null });

			await axios.delete(`${API_URL}/clear`, {
				headers: getAuthHeader(),
			});

			dispatch({ type: ACTIONS.CLEAR_CART });
		} catch (error) {
			console.error("Clear cart error:", error);
			dispatch({
				type: ACTIONS.SET_ERROR,
				payload:
					error.response?.data?.message || "Failed to clear cart",
			});
		} finally {
			dispatch({ type: ACTIONS.SET_LOADING, payload: false });
		}
	};

	const value = {
		cart: state.items,
		total: state.total,
		loading: state.loading,
		error: state.error,
		addToCart,
		removeFromCart,
		updateQuantity,
		clearCart,
	};

	return (
		<CartContext.Provider value={value}>{children}</CartContext.Provider>
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
