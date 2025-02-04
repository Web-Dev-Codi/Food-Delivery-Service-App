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
	cart: [],
	total: 0,
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
				cart: Array.isArray(action.payload) ? action.payload : [],
				total: calculateTotal(action.payload),
			};
		case ACTIONS.ADD_TO_CART: {
			const updatedItemsAdd = [...(state.cart || []), action.payload];
			return {
				...state,
				cart: updatedItemsAdd,
				total: calculateTotal(updatedItemsAdd),
			};
		}
		case ACTIONS.REMOVE_FROM_CART: {
			const updatedItemsRemove = (state.cart || []).filter(
				(item) => item._id !== action.payload
			);
			return {
				...state,
				cart: updatedItemsRemove,
				total: calculateTotal(updatedItemsRemove),
			};
		}
		case ACTIONS.UPDATE_QUANTITY: {
			const updatedItemsQuantity = (state.cart || []).map((item) =>
				item._id === action.payload.itemId
					? { ...item, quantity: action.payload.quantity }
					: item
			);
			return {
				...state,
				cart: updatedItemsQuantity,
				total: calculateTotal(updatedItemsQuantity),
			};
		}
		case ACTIONS.CLEAR_CART:
			return {
				...state,
				cart: [],
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
	if (!Array.isArray(items) || items.length === 0) return 0;
	return items.reduce((total, item) => {
		const price = Number(item.price) || 0;
		const quantity = Number(item.quantity) || 0;
		return total + (price * quantity);
	}, 0);
};

// Cart Provider component
export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, initialState);

	// API base URL
	const API_URL = "http://localhost:8000/api";

	// Handle cart initialization and merging on mount/login
	useEffect(() => {
		const token = localStorage.getItem("token");
		const cartData = localStorage.getItem("cart");
		const parsedCart = cartData ? JSON.parse(cartData) : null;

		if (token && parsedCart?.isGuestCart) {
			// User is logged in and has a guest cart - merge them
			mergeCartsOnLogin(parsedCart);
		} else if (token) {
			// User is logged in but no guest cart - just fetch their cart
			fetchCart();
		} else if (parsedCart) {
			// No token but has guest cart - load it
			const transformedItems = parsedCart.items.map(item => ({
				_id: item.menuItem,
				name: item.menuItem,
				price: item.price,
				quantity: item.quantity
			}));
			dispatch({ type: ACTIONS.SET_CART, payload: transformedItems });
		}
	}, []);

	// Merge guest cart with user cart on login
	const mergeCartsOnLogin = async (guestCart) => {
		const token = localStorage.getItem("token");
		if (!token || !guestCart) return;

		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			const response = await axios.post(
				`${API_URL}/cart/merge`,
				{
					guestCartId: guestCart.cartId,
					guestCartItems: guestCart.items
				},
				{
					headers: { Authorization: `Bearer ${token}` }
				}
			);

			// Clear guest cart from localStorage
			localStorage.removeItem("cart");
			
			// Set the merged cart and save to localStorage
			const cartItems = response.data.items || [];
			dispatch({ type: ACTIONS.SET_CART, payload: cartItems });
			saveToLocalStorage(cartItems);
		} catch (error) {
			dispatch({
				type: ACTIONS.SET_ERROR,
				payload: error.response?.data?.message || "Failed to merge carts"
			});
		} finally {
			dispatch({ type: ACTIONS.SET_LOADING, payload: false });
		}
	};

	// Save cart to localStorage
	const saveToLocalStorage = (cartItems) => {
		if (!Array.isArray(cartItems)) return;
		
		const transformedItems = cartItems.map(item => ({
			menuItem: item._id,
			quantity: item.quantity,
			price: item.price
		}));
		
		localStorage.setItem("cart", JSON.stringify({
			user: localStorage.getItem("guestId") || "guest",
			isGuestCart: true,
			items: transformedItems
		}));
	};

	// Fetch cart items from backend or localStorage
	const fetchCart = async () => {
		const token = localStorage.getItem("token");
		if (!token) {
			// Guest user - load from localStorage
			const cartData = localStorage.getItem("cart");
			if (cartData) {
				const parsedCart = JSON.parse(cartData);
				if (parsedCart.items && Array.isArray(parsedCart.items)) {
					// Transform items to match expected structure
					const transformedItems = parsedCart.items.map(item => ({
						_id: item.menuItem,
						name: item.menuItem, // We'll need to fetch actual menu item data
						price: item.price,
						quantity: item.quantity
					}));
					dispatch({ type: ACTIONS.SET_CART, payload: transformedItems });
				}
			}
			return;
		}

		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			const response = await axios.get(`${API_URL}/cart`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const cartItems = response.data.items || [];
			dispatch({ type: ACTIONS.SET_CART, payload: cartItems });
			saveToLocalStorage(cartItems);
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
		const token = localStorage.getItem("token");
		if (!token) {
			// Guest user - update localStorage
			dispatch({ type: ACTIONS.ADD_TO_CART, payload: item });
			saveToLocalStorage([...state.items, item]);
			return;
		}

		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			const response = await axios.post(`${API_URL}/cart/add`, item, {
				headers: { Authorization: `Bearer ${token}` },
			});
			dispatch({ type: ACTIONS.ADD_TO_CART, payload: response.data });
		} catch (error) {
			// Fallback to localStorage on API failure
			dispatch({ type: ACTIONS.ADD_TO_CART, payload: item });
			saveToLocalStorage([...state.items, item]);
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
		const token = localStorage.getItem("token");
		if (!token) {
			// Guest user - update localStorage
			const updatedItems = state.cart.filter(
				(item) => item._id !== itemId
			);
			dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: itemId });
			saveToLocalStorage(updatedItems);
			return;
		}

		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			await axios.delete(`${API_URL}/cart/remove/${itemId}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: itemId });
		} catch (error) {
			// Fallback to localStorage on API failure
			dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: itemId });
			const updatedItems = state.items.filter(
				(item) => item._id !== itemId
			);
			saveToLocalStorage(updatedItems);
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
		const token = localStorage.getItem("token");
		if (!token) {
			// Guest user - update localStorage
			const updatedItems = state.cart.map((item) =>
				item._id === itemId ? { ...item, quantity } : item
			);
			dispatch({
				type: ACTIONS.UPDATE_QUANTITY,
				payload: { itemId, quantity },
			});
			saveToLocalStorage(updatedItems);
			return;
		}

		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			await axios.put(
				`${API_URL}/cart/update-quantity`,
				{ menuItemId: itemId, quantity },
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			dispatch({
				type: ACTIONS.UPDATE_QUANTITY,
				payload: { itemId, quantity },
			});
		} catch (error) {
			// Fallback to localStorage on API failure
			dispatch({
				type: ACTIONS.UPDATE_QUANTITY,
				payload: { itemId, quantity },
			});
			const updatedItems = state.items.map((item) =>
				item._id === itemId ? { ...item, quantity } : item
			);
			saveToLocalStorage(updatedItems);
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
		const token = localStorage.getItem("token");
		if (!token) {
			// Guest user - clear localStorage
			dispatch({ type: ACTIONS.CLEAR_CART });
			localStorage.removeItem("guestCart");
			return;
		}

		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			await axios.delete(`${API_URL}/cart/clear`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			dispatch({ type: ACTIONS.CLEAR_CART });
		} catch (error) {
			// Fallback to localStorage on API failure
			dispatch({ type: ACTIONS.CLEAR_CART });
			localStorage.removeItem("guestCart");
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
