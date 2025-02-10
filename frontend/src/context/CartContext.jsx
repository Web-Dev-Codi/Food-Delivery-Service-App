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
			const transformedItems = parsedCart.items.map((item) => ({
				menuItem: {
					_id: item.menuItem?._id,
					name: item.menuItem?.name,
					price: item.menuItem?.price,
					description: item.menuItem?.description,
					imageUrl: item.menuItem?.imageUrl,
				},
				quantity: item.quantity,
			}));
			dispatch({ type: ACTIONS.SET_CART, payload: transformedItems });
		} else {
			// No cart data at all - initialize empty cart
			dispatch({ type: ACTIONS.SET_CART, payload: [] });
		}
	}, []);

	// Merge guest cart with user cart on login
	const mergeCartsOnLogin = async (guestCart) => {
		const token = localStorage.getItem("token");
		if (!token || !guestCart) return;

		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			// Clear guest cart from localStorage before merging to prevent duplication
			localStorage.removeItem("cart");

			const response = await axios.post(
				`${API_URL}/merge`,
				{
					guestCartId: guestCart.cartId,
					guestCartItems: guestCart.items,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			// Set the merged cart from the response
			if (response.data?.cart?.items) {
				const transformedItems = response.data.cart.items.map(
					(item) => ({
						menuItem: {
							_id: item.menuItem?._id,
							name: item.menuItem?.name,
							price: item.menuItem?.price,
							description: item.menuItem?.description,
							imageUrl: item.menuItem?.imageUrl,
						},
						quantity: item.quantity,
					})
				);
				dispatch({
					type: ACTIONS.SET_CART,
					payload: transformedItems,
				});
			} else {
				// If no items in response, set empty cart
				dispatch({ type: ACTIONS.SET_CART, payload: [] });
			}
		} catch (error) {
			console.error("Error merging carts:", error);
			dispatch({
				type: ACTIONS.SET_ERROR,
				payload:
					error.response?.data?.message || "Failed to merge carts",
			});
			// Reset cart to empty on error
			dispatch({ type: ACTIONS.SET_CART, payload: [] });
		} finally {
			dispatch({ type: ACTIONS.SET_LOADING, payload: false });
		}
	};

	// Save cart to localStorage
	const saveToLocalStorage = (cartItems) => {
		if (!Array.isArray(cartItems)) return;

		// Only save to localStorage for guest users
		const token = localStorage.getItem("token");
		if (token) return;

		const transformedItems = cartItems.map((item) => ({
			menuItem: {
				_id: item.menuItem._id,
				name: item.menuItem.name,
				price: item.menuItem.price,
				description: item.menuItem.description,
				imageUrl: item.menuItem.imageUrl,
			},
			quantity: item.quantity,
		}));

		localStorage.setItem(
			"cart",
			JSON.stringify({
				user: localStorage.getItem("guestId") || "guest",
				isGuestCart: true,
				items: transformedItems,
			})
		);
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
					// Keep the original structure with menuItem object
					const transformedItems = parsedCart.items.map((item) => ({
						menuItem: {
							_id: item.menuItem?._id,
							name: item.menuItem?.name,
							price: item.menuItem?.price,
							description: item.menuItem?.description,
							imageUrl: item.menuItem?.imageUrl,
						},
						quantity: item.quantity,
					}));
					dispatch({
						type: ACTIONS.SET_CART,
						payload: transformedItems,
					});
				}
			}
			return;
		}

		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			const response = await axios.get(API_URL, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const cartItems = response.data.items || [];
			dispatch({ type: ACTIONS.SET_CART, payload: cartItems });
			// saveToLocalStorage(cartItems);
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
		localStorage.removeItem("cart");
	};

	// Update item quantity
	const updateQuantity = async (menuItemId, quantity) => {
		const token = localStorage.getItem("token");
		if (!token) {
			// Guest user - update localStorage
			const updatedItems = state.cart.items.map((item) =>
				item.menuItem._id === menuItemId ? { ...item, quantity } : item
			);
			dispatch({
				type: ACTIONS.UPDATE_QUANTITY,
				payload: { menuItemId, quantity },
			});
			saveToLocalStorage(updatedItems);
			return;
		}

		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			const response = await axios.put(
				`${API_URL}/update/${menuItemId}`,
				{ menuItemId, quantity },
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
	const removeFromCart = async (menuItemId) => {
		const token = localStorage.getItem("token");
		if (!token) {
			// Guest user - update localStorage
			const updatedItems = state.cart.items.filter(
				(item) => item.menuItem._id !== menuItemId
			);
			dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: menuItemId });
			saveToLocalStorage(updatedItems);
			return;
		}

		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			await axios.delete(`${API_URL}/remove/${menuItemId}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: menuItemId });
		} catch (error) {
			// Fallback to localStorage on API failure
			dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: menuItemId });
			const updatedItems = state.cart.items.filter(
				(item) => item.menuItem._id !== menuItemId
			);
			saveToLocalStorage(updatedItems);
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
		if (!token) {
			// Guest user - update localStorage
			if (!item.menuItem.price) {
				dispatch({
					type: ACTIONS.SET_ERROR,
					payload: "Item price is required",
				});
				return;
			}
			dispatch({ type: ACTIONS.ADD_TO_CART, payload: item });
			saveToLocalStorage([...state.cart.items, item]);
			return;
		}

		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			const response = await axios.post(`${API_URL}/add`, item, {
				headers: { Authorization: `Bearer ${token}` },
			});
			dispatch({ type: ACTIONS.ADD_TO_CART, payload: response.data });
		} catch (error) {
			// Fallback to localStorage on API failure
			dispatch({ type: ACTIONS.ADD_TO_CART, payload: item });
			saveToLocalStorage([...state.cart.items, item]);
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
