// src/context/CartContext.jsx
import { createContext, useContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

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
	isGuest: true, // New flag to track guest status
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

// Helper function to calculate total
const calculateTotal = (items) => {
	if (!Array.isArray(items) || items.length === 0) return 0;
	return items.reduce((total, item) => {
		const price = Number(item.menuItem?.price) || 0;
		const quantity = Number(item.quantity) || 0;
		return total + price * quantity;
	}, 0);
};

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

		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			const response = await axios.get(API_URL, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const cartItems = response.data.items || [];
			dispatch({ type: ACTIONS.SET_CART, payload: cartItems });
		} catch (error) {
			dispatch({
				type: ACTIONS.SET_ERROR,
				payload:
					error.response?.data?.message || "Failed to fetch cart",
			});
		} finally {
			dispatch({ type: ACTIONS.SET_LOADING, payload: false });
		}
	};

	// Clear cart
	const clearCart = () => {
		dispatch({ type: ACTIONS.CLEAR_CART });
	};

	// Update item quantity
	const updateQuantity = async (quantity) => {
		const token = localStorage.getItem("token");

		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			const response = await axios.put(
				`${API_URL}/update}`,
				{ quantity },
				{ headers: { Authorization: `Bearer ${token}` } }
			);

			if (response.data.success) {
				dispatch({
					type: ACTIONS.SET_CART,
					payload: response.data.cart.items,
				});
			} else {
				throw new Error(
					response.data.message || "Failed to update cart"
				);
			}
		} catch (error) {
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

	// Remove item from cart
	const removeFromCart = async (foodItemId) => {
		const token = localStorage.getItem("token");

		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			await axios.delete(`${API_URL}/remove/${foodItemId}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: foodItemId });
		} catch (error) {
			dispatch({
				type: ACTIONS.SET_ERROR,
				payload:
					error.response?.data?.message || "Failed to remove item",
			});
		} finally {
			dispatch({ type: ACTIONS.SET_LOADING, payload: false });
		}
	};

	// Add item to cart
	const addToCart = async (item) => {
		const token = localStorage.getItem("token");

		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			const response = await axios.post(`${API_URL}/add`, item, {
				headers: { Authorization: `Bearer ${token}` },
			});
			dispatch({ type: ACTIONS.ADD_TO_CART, payload: response.data });
		} catch (error) {
			dispatch({
				type: ACTIONS.SET_ERROR,
				payload: error.response?.data?.message || "Failed to add item",
			});
		} finally {
			dispatch({ type: ACTIONS.SET_LOADING, payload: false });
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
