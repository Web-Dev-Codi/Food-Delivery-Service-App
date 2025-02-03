// src/context/CartContext.jsx
import {
	createContext,
	useContext,
	useReducer,
	useEffect,
	useState,
} from "react";
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
					isGuest: !localStorage.getItem("token"),
			  };
	} catch (error) {
		console.error("Error reading cart from localStorage:", error);
		return {
			items: [],
			total: 0,
			loading: false,
			error: null,
			isGuest: !localStorage.getItem("token"),
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
		case ACTIONS.ADD_TO_CART: {
			const existingItem = state.items.find(
				(item) => item.menuItem === action.payload.menuItem
			);
			let updatedItems;
			if (existingItem) {
				updatedItems = state.items.map((item) =>
					item.menuItem === action.payload.menuItem
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
		}
		case ACTIONS.REMOVE_FROM_CART: {
			const filteredItems = state.items.filter(
				(item) => item.menuItem !== action.payload
			);
			newState = {
				...state,
				items: filteredItems,
				total: calculateTotal(filteredItems),
				loading: false,
				error: null,
			};
			break;
		}
		case ACTIONS.UPDATE_QUANTITY: {
			const updatedItems = state.items.map((item) => {
				if (item.menuItem === action.payload.menuItemId) {
					return { ...item, quantity: action.payload.quantity };
				}
				return item;
			});
			newState = {
				...state,
				items: updatedItems,
				total: calculateTotal(updatedItems),
				loading: false,
				error: null,
			};
			break;
		}
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
			newState = { ...state, loading: action.payload };
			break;
		case ACTIONS.SET_ERROR:
			newState = { ...state, error: action.payload, loading: false };
			break;
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}

	return newState;
};

// Cart Provider component
export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, getInitialState());
	const [authToken, setAuthToken] = useState(localStorage.getItem("token"));
	const [syncNeeded, setSyncNeeded] = useState(false);

	// Watch for auth token changes
	useEffect(() => {
		const handleStorageChange = () => {
			const newToken = localStorage.getItem("token");
			if (newToken !== authToken) {
				setAuthToken(newToken);
			}
		};

		window.addEventListener("storage", handleStorageChange);
		return () => window.removeEventListener("storage", handleStorageChange);
	}, [authToken]);

	// Mark sync as needed when cart items change
	useEffect(() => {
		setSyncNeeded(true);
	}, [state.items]);

	// Save to localStorage whenever cart state changes
	useEffect(() => {
		if (!state.loading) {  // Only save when not in loading state
			try {
				localStorage.setItem(
					"cart",
					JSON.stringify({
						items: state.items,
						total: state.total,
						loading: false,  // Don't persist loading state
						error: null,    // Don't persist error state
						isGuest: !localStorage.getItem("token"),
					})
				);
			} catch (error) {
				console.error("Error saving cart to localStorage:", error);
			}
		}
	}, [state.items, state.total]);

	// Sync cart with database when needed
	useEffect(() => {
		const syncCartWithDatabase = async () => {
			if (!syncNeeded) return;

			const headers = getHeaders();

			// Only sync if we have proper authentication
			if (
				(state.items.length > 0 &&
					!state.loading &&
					headers["Authorization"]) ||
				headers["X-Guest-ID"]
			) {
				try {
					const response = await axios.post(
						`${API_URL}/sync`,
						{ items: state.items },
						{ headers }
					);

					// Only update if the server response is different
					if (
						response.data?.items &&
						JSON.stringify(response.data.items) !==
							JSON.stringify(state.items)
					) {
						dispatch({
							type: ACTIONS.SET_CART,
							payload: response.data.items,
						});
					}
					setSyncNeeded(false);
				} catch (error) {
					console.error("Error syncing cart with database:", error);
					setSyncNeeded(false);
				}
			}
		};

		syncCartWithDatabase();
	}, [syncNeeded, state.items, state.loading]);

	// API base URL
	const API_URL = "http://localhost:8000/api/cart";

	// Get headers for API requests
	const getHeaders = () => {
		const token = localStorage.getItem("token");
		const guestId = localStorage.getItem("guestId");
		const headers = {
			"Content-Type": "application/json",
		};

		if (token) {
			headers.Authorization = `Bearer ${token}`;
		} else if (guestId) {
			headers["X-Guest-ID"] = guestId;
		}

		return headers;
	};

	// Load cart when component mounts or auth status changes
	useEffect(() => {
		const loadCart = async () => {
			const guestId = localStorage.getItem("guestId");
			const savedCart = localStorage.getItem("cart");

			// Create a guest ID if needed
			if (!authToken && !guestId) {
				const newGuestId =
					Math.random().toString(36).substr(2, 9) +
					Date.now().toString(36);
				localStorage.setItem("guestId", newGuestId);
			}

			// If there's a saved cart in localStorage, use it first
			if (savedCart) {
				try {
					const parsedCart = JSON.parse(savedCart);
					if (parsedCart.items && Array.isArray(parsedCart.items)) {
						dispatch({
							type: ACTIONS.SET_CART,
							payload: parsedCart.items,
						});
						return; // Don't fetch from backend if we have local data
					}
				} catch (error) {
					console.error("Error parsing saved cart:", error);
				}
			}

			// Only fetch from backend if we don't have local data
			await fetchCart();
		};

		loadCart();
	}, [authToken]); // Only re-run when auth token changes

	// Fetch cart items from backend
	const fetchCart = async () => {
		const headers = getHeaders();

		// Only fetch if we have proper authentication
		if (!headers["Authorization"] && !headers["X-Guest-ID"]) {
			return;
		}

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
				// Handle unauthorized error silently for guests
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
		const headers = getHeaders();

		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			dispatch({ type: ACTIONS.SET_ERROR, payload: null });

			// Always try to sync with backend
			await axios.post(
				`${API_URL}/add`,
				{
					menuItemId: item.menuItem,
					quantity: item.quantity,
				},
				{ headers }
			);

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
	const updateQuantity = async (menuItemId, quantity) => {
		const headers = getHeaders();

		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			dispatch({ type: ACTIONS.SET_ERROR, payload: null });

			// Always try to sync with backend
			await axios.put(
				`${API_URL}/update-quantity`,
				{
					menuItemId,
					quantity,
				},
				{ headers }
			);

			dispatch({
				type: ACTIONS.UPDATE_QUANTITY,
				payload: { menuItemId, quantity },
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
		const headers = getHeaders();

		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			dispatch({ type: ACTIONS.SET_ERROR, payload: null });

			// Always try to sync with backend
			await axios.delete(`${API_URL}/remove/${itemId}`, { headers });

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
		const headers = getHeaders();

		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			dispatch({ type: ACTIONS.SET_ERROR, payload: null });

			// Always try to sync with backend
			await axios.delete(`${API_URL}/clear`, { headers });

			dispatch({ type: ACTIONS.CLEAR_CART });
			localStorage.removeItem("cart"); // Also clear from localStorage
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
				cart: state,
				total: state.total,
				loading: state.loading,
				error: state.error,
				isGuest: !localStorage.getItem("token"),
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
