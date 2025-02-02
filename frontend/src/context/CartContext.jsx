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

// Initial state
const initialState = {
	items: [],
	total: 0,
	loading: false,
	error: null,
};

// Reducer function
const cartReducer = (state, action) => {
	switch (action.type) {
		case ACTIONS.SET_CART:
			return {
				...state,
				items: action.payload,
				total: calculateTotal(action.payload),
			};
		case ACTIONS.ADD_TO_CART:
			{ const updatedItemsAdd = [...state.items, action.payload];
			return {
				...state,
				items: updatedItemsAdd,
				total: calculateTotal(updatedItemsAdd),
			}; }
		case ACTIONS.REMOVE_FROM_CART:
			{ const updatedItemsRemove = state.items.filter(
				(item) => item._id !== action.payload
			);
			return {
				...state,
				items: updatedItemsRemove,
				total: calculateTotal(updatedItemsRemove),
			}; }
		case ACTIONS.UPDATE_QUANTITY:
			{ const updatedItemsQuantity = state.items.map((item) =>
				item._id === action.payload.itemId
					? { ...item, quantity: action.payload.quantity }
					: item
			);
			return {
				...state,
				items: updatedItemsQuantity,
				total: calculateTotal(updatedItemsQuantity),
			}; }
		case ACTIONS.CLEAR_CART:
			return {
				...state,
				items: [],
				total: 0,
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
	return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

// Cart Provider component
export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, initialState);

	// API base URL
	const API_URL = "http://localhost:8000/api/cart";

	// Fetch cart data on component mount
	useEffect(() => {
		fetchCart();
	}, []);

	// Fetch cart items from backend
	const fetchCart = async () => {
		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			const response = await axios.get(API_URL, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`, // Add your auth token here
				},
			});
			dispatch({ type: ACTIONS.SET_CART, payload: response.data });
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

	// Add item to cart
	const addToCart = async (item) => {
		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			const response = await axios.post(`${API_URL}/add`, item, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
			dispatch({ type: ACTIONS.ADD_TO_CART, payload: response.data });
		} catch (error) {
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
	const removeFromCart = async (itemId) => {
		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			await axios.delete(`${API_URL}/remove/${itemId}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
			dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: itemId });
		} catch (error) {
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
	const updateQuantity = async (itemId, quantity) => {
		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			await axios.put(
				`${API_URL}/update/${itemId}`,
				{ quantity },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				}
			);
			dispatch({
				type: ACTIONS.UPDATE_QUANTITY,
				payload: { itemId, quantity },
			});
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

	// Clear cart
	const clearCart = async () => {
		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			await axios.delete(`${API_URL}/clear`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
			dispatch({ type: ACTIONS.CLEAR_CART });
		} catch (error) {
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
