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
	SET_CART_ID: "SET_CART_ID",
};

// Initial state
const initialState = {
	cart: [],
	total: 0,
	loading: false,
	error: null,
	isGuest: true,
	cartId: null,
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
		case ACTIONS.SET_CART_ID:
			return {
				...state,
				cartId: action.payload,
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
		console.log("Initializing cart...");
		const token = localStorage.getItem("token");
		const cartData = localStorage.getItem("cart");
		let parsedCart = null;

		try {
			parsedCart = cartData ? JSON.parse(cartData) : null;
			console.log("Parsed cart data:", parsedCart);
		} catch (error) {
			console.error("Error parsing cart data:", error);
		}

		// Ensure cart has an ID
		if (parsedCart && !parsedCart.cartId) {
			parsedCart.cartId = `cart_${Math.random()
				.toString(36)
				.substring(2, 15)}`;
			localStorage.setItem("cart", JSON.stringify(parsedCart));
			console.log("Generated new cart ID:", parsedCart.cartId);
		}

		if (token && parsedCart?.isGuestCart) {
			console.log("User logged in with guest cart - merging...");
			mergeCartsOnLogin(parsedCart);
		} else if (token) {
			console.log(
				"User logged in without guest cart - fetching user cart..."
			);
			fetchCart();
		} else if (parsedCart) {
			console.log("Loading guest cart from localStorage...");
			const transformedItems = parsedCart.items.map((item) => ({
				_id: item.menuItem,
				name: item.name,
				price: item.price,
				quantity: item.quantity,
				imageUrl: item.imageUrl,
				description: item.description,
			}));

			// Set both cart items and cartId
			dispatch({ type: ACTIONS.SET_CART, payload: transformedItems });
			dispatch({ type: ACTIONS.SET_CART_ID, payload: parsedCart.cartId });
			console.log("Loaded guest cart with ID:", parsedCart.cartId);
		} else {
			console.log("No existing cart - initializing empty cart...");
			const newCartId = `cart_${Date.now()}_${Math.random()
				.toString(36)
				.substring(2, 10)}`;
			dispatch({ type: ACTIONS.SET_CART, payload: [] });
			dispatch({ type: ACTIONS.SET_CART_ID, payload: newCartId });
			console.log("Initialized empty cart with ID:", newCartId);
		}
	}, []);

	// Monitor authentication state
	useEffect(() => {
		const checkAuthAndFetchCart = () => {
			const token = localStorage.getItem("token");
			if (token) {
				console.log("Token detected, fetching user cart...");
				fetchCart();
			}
		};

		// Initial check
		checkAuthAndFetchCart();

		// Listen for storage changes
		const handleStorageChange = (e) => {
			if (e.key === "token") {
				console.log("Token changed, updating cart...");
				checkAuthAndFetchCart();
			}
		};

		window.addEventListener("storage", handleStorageChange);
		return () => window.removeEventListener("storage", handleStorageChange);
	}, []);

	// frontend/src/context/CartContext.jsx
	const mergeCartsOnLogin = async (guestCart) => {
		const transformedItems = guestCart.items
			.filter((item) => item?.menuItem?._id)
			.map((item) => ({
				menuItem: item.menuItem._id,
				quantity: Number(item.quantity) || 1,
			}));

		try {
			const token = localStorage.getItem("token");
			if (!token) return;

			console.log("Converted items for backend:", transformedItems);

			console.log('Submitting cart conversion payload:', {
				items: transformedItems,
				itemCount: transformedItems.length
			});

			// Validate at least 1 item exists
			if (!transformedItems.length) {
				console.warn('Cart conversion aborted - empty valid items');
				return;
			}

			const response = await axios.post(
				`${API_URL}/convert-to-user`,
				{ items: transformedItems },
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);

			// Transform response items for frontend state
			const cartItems = response.data.cart.items.map((item) => ({
				_id: item.menuItem._id,
				name: item.menuItem.name,
				price: item.menuItem.price,
				quantity: item.quantity,
				imageUrl: item.menuItem.imageUrl,
				description: item.menuItem.description,
			}));

			dispatch({ type: ACTIONS.SET_CART, payload: cartItems });
			dispatch({
				type: ACTIONS.SET_CART_ID,
				payload: response.data.cart.cartId,
			});
		} catch (error) {
			console.error("Cart conversion failed:", {
				error: error.response?.data || error.message,
				requestItems: transformedItems,
			});
		}
	};
	// Save cart to localStorage
	const saveToLocalStorage = (cartItems) => {
		if (!Array.isArray(cartItems)) {
			console.log("Invalid cart items format, not saving");
			return;
		}

		// Only save to localStorage for guest users
		const token = localStorage.getItem("token");
		if (token) {
			console.log("User is logged in, not saving to localStorage");
			return;
		}

		// Get existing cart data first
		const existingCartData = localStorage.getItem("cart");
		let existingCart = null;
		try {
			existingCart = existingCartData
				? JSON.parse(existingCartData)
				: null;
		} catch (error) {
			console.error("Error parsing existing cart:", error);
		}

		// Use existing cartId or generate new one
		let cartId = existingCart?.cartId || state.cartId;
		if (!cartId) {
			cartId = `cart_${Math.random().toString(36).substring(2, 15)}`;
			dispatch({ type: ACTIONS.SET_CART_ID, payload: cartId });
		}

		console.log("Using cart ID:", cartId);

		const transformedItems = cartItems.map((item) => ({
			menuItem: item.menuItem, // Store full object
			name: item.name,
			quantity: item.quantity,
			price: item.price,
			imageUrl: item.imageUrl,
			description: item.description,
		}));

		const cartData = {
			cartId,
			user: localStorage.getItem("guestId") || "guest",
			isGuestCart: true,
			items: transformedItems,
		};

		console.log("Saving cart to localStorage:", cartData);
		localStorage.setItem("cart", JSON.stringify(cartData));
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
					// Set cartId from localStorage
					if (parsedCart.cartId) {
						dispatch({
							type: ACTIONS.SET_CART_ID,
							payload: parsedCart.cartId,
						});
					}

					// Transform items to match expected structure
					const transformedItems = parsedCart.items.map((item) => ({
						_id: item.menuItem,
						name: item.name,
						price: item.price,
						quantity: item.quantity,
						imageUrl: item.imageUrl,
						description: item.description,
					}));
					dispatch({
						type: ACTIONS.SET_CART,
						payload: transformedItems,
					});
				}
			}
			return;
		}

		console.log("Fetching cart from backend...");

		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			const response = await axios.get(`${API_URL}/`, {
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
			saveToLocalStorage([...state.cart, item]);
			return;
		}

		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			const response = await axios.post(
				`${API_URL}/add/${item._id}`,
				{ quantity: item.quantity },
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			dispatch({ type: ACTIONS.ADD_TO_CART, payload: response.data });
		} catch (error) {
			// Fallback to localStorage on API failure
			dispatch({ type: ACTIONS.ADD_TO_CART, payload: item });
			saveToLocalStorage([...state.cart, item]);
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

	// Delete item from cart by menuItemId
	const removeFromCart = async (menuItemId) => {
		const token = localStorage.getItem("token");
		if (!token) {
			// Guest user - update localStorage
			const updatedItems = state.cart.filter(
				(item) => item._id !== menuItemId
			);
			dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: menuItemId });
			saveToLocalStorage(updatedItems);
			return;
		}

		try {
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			await axios.delete(`${API_URL}/delete/${menuItemId}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: menuItemId });
		} catch (error) {
			// Fallback to localStorage on API failure
			dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: menuItemId });
			const updatedItems = state.cart.filter(
				(item) => item._id !== menuItemId
			);
			saveToLocalStorage(updatedItems);
			dispatch({
				type: ACTIONS.SET_ERROR,
				payload:
					error.response?.data?.message ||
					"Failed to delete item from cart",
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
				`${API_URL}/update/${itemId}`,
				{ quantity },
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
			const updatedItems = state.cart.map((item) =>
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
			await axios.delete(`${API_URL}/clear`, {
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
