// src/context/CartContext.jsx
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
				_id: item.menuItem,
				name: item.name,
				price: item.price,
				quantity: item.quantity,
				imageUrl: item.imageUrl,
				description: item.description,
			}));
			dispatch({ type: ACTIONS.SET_CART, payload: transformedItems });
		} else {
			// No cart data at all - initialize empty cart
			dispatch({ type: ACTIONS.SET_CART, payload: [] });
		}
	}, []);

	// Merge guest cart with user cart on login
	const mergeCartsOnLogin = async (guestCart) => {
		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			const token = localStorage.getItem("token");

			const response = await fetch(`${API_URL}/transfer`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					guestCartId: guestCart.user,
					userId: JSON.parse(localStorage.getItem("user"))._id,
				}),
			});

			if (!response.ok) throw new Error("Failed to merge carts");

			const data = await response.json();
			const mergedCart = data.items.map((item) => ({
				_id: item._id,
				name: item.name,
				price: item.price,
				quantity: item.quantity,
				imageUrl: item.imageUrl,
			}));

			dispatch({ type: ACTIONS.SET_CART, payload: mergedCart });
			localStorage.removeItem("cart");
		} catch (error) {
			dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
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
			menuItem: item._id,
			name: item.name,
			quantity: item.quantity,
			price: item.price,
			imageUrl: item.imageUrl,
			description: item.description,
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
		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			const token = localStorage.getItem("token");

			if (token) {
				const response = await fetch(`${API_URL}/cart`, {
					headers: { Authorization: `Bearer ${token}` },
				});

				if (!response.ok) throw new Error("Failed to fetch cart");

				const data = await response.json();
				const transformed = data.items.map((item) => ({
					_id: item.foodItem._id,
					name: item.foodItem.name,
					price: item.foodItem.price,
					quantity: item.quantity,
					imageUrl: item.foodItem.imageUrl,
				}));

				dispatch({ type: ACTIONS.SET_CART, payload: transformed });
			} else {
				const localCart = JSON.parse(
					localStorage.getItem("cart") || "{}"
				);
				if (localCart.items) {
					dispatch({
						type: ACTIONS.SET_CART,
						payload: localCart.items,
					});
				}
			}
		} catch (error) {
			dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
		} finally {
			dispatch({ type: ACTIONS.SET_LOADING, payload: false });
		}
	};

	// Add item to cart
	const addToCart = async (item) => {
		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			const token = localStorage.getItem("token");

			if (token) {
				const response = await fetch(`${API_URL}/cart/add`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						foodItemId: item._id,
						quantity: item.quantity,
					}),
				});

				if (!response.ok) throw new Error("Failed to add item");

				const data = await response.json();
				dispatch({ type: ACTIONS.ADD_TO_CART, payload: data.item });
			} else {
				const newCart = [...state.cart, item];
				dispatch({ type: ACTIONS.ADD_TO_CART, payload: item });
				saveToLocalStorage(newCart);
			}
		} catch (error) {
			dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
		} finally {
			dispatch({ type: ACTIONS.SET_LOADING, payload: false });
		}
	};

	// Remove item from cart
	const removeFromCart = async (foodItemId) => {
		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			const token = localStorage.getItem("token");

			if (token) {
				const response = await fetch(
					`${API_URL}/${state.cartId}/item/${foodItemId}`,
					{
						method: "DELETE",
						headers: { Authorization: `Bearer ${token}` },
					}
				);

				if (!response.ok) throw new Error("Failed to remove item");

				dispatch({
					type: ACTIONS.REMOVE_FROM_CART,
					payload: foodItemId,
				});
			} else {
				const newCart = state.cart.filter(
					(item) => item._id !== foodItemId
				);
				dispatch({
					type: ACTIONS.REMOVE_FROM_CART,
					payload: foodItemId,
				});
				saveToLocalStorage(newCart);
			}
		} catch (error) {
			dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
		} finally {
			dispatch({ type: ACTIONS.SET_LOADING, payload: false });
		}
	};

	// Update item quantity
	const updateQuantity = async (foodItemId, quantity) => {
		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			const token = localStorage.getItem("token");

			if (token) {
				const response = await fetch(`${API_URL}/update`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ foodItemId, quantity }),
				});

				if (!response.ok) throw new Error("Failed to update quantity");

				const data = await response.json();
				dispatch({
					type: ACTIONS.UPDATE_QUANTITY,
					payload: { foodItemId, quantity: data.quantity },
				});
			} else {
				const newCart = state.cart.map((item) =>
					item._id === foodItemId ? { ...item, quantity } : item
				);
				dispatch({
					type: ACTIONS.UPDATE_QUANTITY,
					payload: { foodItemId, quantity },
				});
				saveToLocalStorage(newCart);
			}
		} catch (error) {
			dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
		} finally {
			dispatch({ type: ACTIONS.SET_LOADING, payload: false });
		}
	};

	// Clear cart
	const clearCart = async () => {
		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			const token = localStorage.getItem("token");

			if (token) {
				const response = await fetch(`${API_URL}/cart/clear`, {
					method: "DELETE",
					headers: { Authorization: `Bearer ${token}` },
				});

				if (!response.ok) throw new Error("Failed to clear cart");

				dispatch({ type: ACTIONS.CLEAR_CART });
			} else {
				dispatch({ type: ACTIONS.CLEAR_CART });
				localStorage.removeItem("cart");
			}
		} catch (error) {
			dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
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
