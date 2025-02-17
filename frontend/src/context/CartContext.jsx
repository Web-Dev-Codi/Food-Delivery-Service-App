import { createContext, useContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";

const CartContext = createContext();

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

// Initial state
const initialState = {
	cart: {
		items: [],
		total: 0,
	},
	loading: false,
	error: null,
};

// Reducer function
const cartReducer = (state, action) => {
	switch (action.type) {
		case ACTIONS.SET_CART:
			return {
				...state,
				cart: {
					items: Array.isArray(action.payload) ? action.payload : [],
					total: calculateTotal(action.payload),
				},
				loading: false,
			};
		case ACTIONS.ADD_TO_CART: {
			const updatedItemsAdd = [
				...(state.cart.items || []),
				action.payload,
			];
			return {
				...state,
				cart: {
					items: updatedItemsAdd,
					total: calculateTotal(updatedItemsAdd),
				},
			};
		}
		case ACTIONS.REMOVE_FROM_CART: {
			const updatedItemsRemove = (state.cart.items || []).filter(
				(item) => item.menuItem._id !== action.payload
			);
			return {
				...state,
				cart: {
					items: updatedItemsRemove,
					total: calculateTotal(updatedItemsRemove),
				},
			};
		}
		case ACTIONS.UPDATE_QUANTITY: {
			const updatedItemsQuantity = (state.cart.items || []).map((item) =>
				item.menuItem._id === action.payload.menuItemId
					? { ...item, quantity: action.payload.quantity }
					: item
			);
			return {
				...state,
				cart: {
					items: updatedItemsQuantity,
					total: calculateTotal(updatedItemsQuantity),
				},
			};
		}
		case ACTIONS.CLEAR_CART:
			return {
				...state,
				cart: {
					items: [],
					total: 0,
				},
			};
		case ACTIONS.SET_LOADING:
			return {
				...state,
				loading: action.payload,
			};
		case ACTIONS.SET_ERROR:
			return {
				...state,
				error: action.payload,
			};
		default:
			return state;
	}
};

// Helper functions
const calculateTotal = (items) => {
	if (!Array.isArray(items) || items.length === 0) return 0;
	return items.reduce((total, item) => {
		const price = Number(item.menuItem?.price) || 0;
		const quantity = Number(item.quantity) || 0;
		return total + price * quantity;
	}, 0);
};

// const getAuthHeaders = () => {
// 	const token = localStorage.getItem("token");
// 	return {
// 		"Content-Type": "application/json",
// 		Authorization: token ? `Bearer ${token}` : "",
// 	};
// };

// Cart Provider component
export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, initialState);

	// API base URL
	const API_URL = "http://localhost:8000/api/cart";

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (token) {
			// User is logged in fetch their cart
			fetchCart();
		}
	}, []);

	// Fetch cart items from backend
	const fetchCart = async () => {
		const token = localStorage.getItem("token");

		if (token) {
			try {
				const response = await fetch(API_URL, {
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
					},
					credentials: "include",
				});

				if (!response.ok) {
					throw new Error("Failed to fetch cart");
				}

				const data = await response.json();
				dispatch({
					type: ACTIONS.SET_CART,
					payload: data.cartItems,
				});
			} catch (error) {
				dispatch({
					type: ACTIONS.SET_ERROR,
					payload: error.message,
				});
			}
		}
	};

	// Clear entire cart
	const clearCart = async () => {
		const token = localStorage.getItem("token");

		if (token) {
			try {
				const response = await fetch(`${API_URL}/clear`, {
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${token}`,
					},
					credentials: "include",
				});

				if (!response.ok) {
					throw new Error("Failed to clear cart");
				}

				dispatch({ type: ACTIONS.CLEAR_CART });
			} catch (error) {
				dispatch({
					type: ACTIONS.SET_ERROR,
					payload: error.message,
				});
			}
		}
	};

	// Update item quantity in cart
	const updateQuantity = async (foodItemId, quantity) => {
		const token = localStorage.getItem("token");

		if (token) {
			try {
				const response = await fetch(`${API_URL}/update-quantity`, {
					method: "PUT",
					headers: {
						Authorization: `Bearer ${token}`,
					},
					credentials: "include",
					body: JSON.stringify({ foodItemId, quantity }),
				});

				if (!response.ok) {
					throw new Error("Failed to update quantity");
				}

				await fetchCart(); // Refresh cart after updating
			} catch (error) {
				dispatch({
					type: ACTIONS.SET_ERROR,
					payload: error.message,
				});
			}
		}
	};

	// Remove item from cart
	const removeFromCart = async (foodItemId) => {
		const token = localStorage.getItem("token");

		if (token) {
			try {
				const response = await fetch(
					`${API_URL}/remove/${foodItemId}`,
					{
						method: "DELETE",
						headers: {
							Authorization: `Bearer ${token}`,
						},
						credentials: "include",
					}
				);

				if (!response.ok) {
					throw new Error("Failed to remove item from cart");
				}

				await fetchCart(); // Refresh cart after removing item
			} catch (error) {
				dispatch({
					type: ACTIONS.SET_ERROR,
					payload: error.message,
				});
			}
		}
	};

	// Add item to cart
	const addToCart = async (foodItemId, quantity = 1) => {
		const token = localStorage.getItem("token");

		if (token) {
			try {
				const response = await fetch(`${API_URL}/add`, {
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
					},
					credentials: "include",
					body: JSON.stringify({ foodItemId, quantity }),
				});

				if (!response.ok) {
					throw new Error("Failed to add item to cart");
				}

				await fetchCart(); // Refresh cart after adding item
			} catch (error) {
				dispatch({
					type: ACTIONS.SET_ERROR,
					payload: error.message,
				});
			}
		}
	};

	const value = {
		cart: state.cart || [],
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
