/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

// Initial state
const initialState = {
	cart: {
		items: [],
		totalAmount: 0,
		discount: 0,
		finalAmount: 0,
	},
	error: null,
};

// Reducer function
const cartReducer = (state, action) => {
	switch (action.type) {
		case "ADD_TO_CART":
			return { ...state, cart: action.payload };

		case "REMOVE_FROM_CART":
			return {
				...state,
				cart: {
					...state.cart,
					items: state.cart.items.filter(
						(item) => item.foodItemId !== action.payload.foodItemId
					),
				},
			};

		/* case "UPDATE_QUANTITY":
			return {
				...state,
				cart: state.cart.map((item) =>
					item.foodItemId === action.payload.foodItemId
						? { ...item, quantity: action.payload.quantity }
						: item
				),
				totalAmount: action.payload.totalAmount,
			}; */

		case "UPDATE_QUANTITY":
			return {
				...state,
				cart: {
					...state.cart,
					items: state.cart.items.map((item) =>
						item.foodItemId === action.payload.foodItemId
							? { ...item, quantity: action.payload.quantity }
							: item
					),
					totalAmount: action.payload.totalAmount,
				},
			};

		case "CLEAR_CART":
			return {
				...state,
				cart: action.payload || {
					items: [],
					totalAmount: 0,
					discount: 0,
					finalAmount: 0,
				},
			};

		/* case "FETCH_CART_SUCCESS":
			return {
				...state,
				cart: action.payload || {
					items: [],
					totalAmount: 0,
					discount: 0,
					finalAmount: 0,
				},
			}; */
		case "FETCH_CART_SUCCESS":
			return {
				...state,
				cart: {
					...state.cart,
					...action.payload, // Ensures `appliedCoupon` and other properties are included correctly
				},
			};

		case "FETCH_CART_ERROR":
			return { ...state, error: action.payload };

		default:
			return state;
	}
};

// Create Context
const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, initialState);

	// Helper function to get Auth headers
	const getAuthHeaders = () => {
		const token = localStorage.getItem("token");
		if (!token) throw new Error("No token found");
		return { Authorization: `Bearer ${token}` };
	};

	const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

	// Fetch Cart
	const fetchCart = async () => {
		const token = localStorage.getItem("token");
		if (!token) return;

		try {
			const response = await axios.get(`${API_URL}/cart/get`, {
				headers: getAuthHeaders(),
			});
			const cartData = response.data.data || {
				items: [],
				totalAmount: 0,
				discount: 0,
				finalAmount: 0,
			};
			dispatch({ type: "FETCH_CART_SUCCESS", payload: cartData });
		} catch (error) {
			dispatch({ type: "FETCH_CART_ERROR", payload: error.message });
		}
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			fetchCart(); // Fetch cart only if token exists
		}
	}, []); // This effect runs only once when component mounts

	// Add to Cart
	const addToCart = async (payload) => {
		try {
			const response = await axios.post(`${API_URL}/cart/add`, payload, {
				headers: getAuthHeaders(),
			});

			// Immediately update the local state with the new cart data
			dispatch({
				type: "FETCH_CART_SUCCESS",
				payload: response.data.data,
			});

			return response.data;
		} catch (error) {
			dispatch({ type: "FETCH_CART_ERROR", payload: error.message });
			throw error;
		}
	};

	// Update Cart Item Quantity
	const updateCartItem = async (foodItemId, quantity) => {
		try {
			const response = await axios.put(
				`${API_URL}/cart/update`,
				{ items: [{ foodItemId, quantity }] },
				{ headers: getAuthHeaders() }
			);

			dispatch({
				type: "FETCH_CART_SUCCESS",
				payload: response.data.data,
			});
		} catch (error) {
			dispatch({ type: "FETCH_CART_ERROR", payload: error.message });
		}
	};

	// Remove Item from Cart
	const removeCartItem = async (foodItemId) => {
		try {
			await axios.delete(`${API_URL}/cart/deleteitem`, {
				data: { items: [{ foodItemId }] },
				headers: getAuthHeaders(),
			});

			// Fetch the updated cart data after removal
			const response = await axios.get(`${API_URL}/cart/get`, {
				headers: getAuthHeaders(),
			});

			// Update state with the fresh cart data
			dispatch({
				type: "FETCH_CART_SUCCESS",
				payload: response.data.data || {
					items: [],
					totalAmount: 0,
					discount: 0,
					finalAmount: 0,
				},
			});
		} catch (error) {
			dispatch({ type: "FETCH_CART_ERROR", payload: error.message });
		}
	};

	// Apply Coupon Code

	const applyCoupon = async (couponCode) => {
		try {
			const response = await axios.post(
				`${API_URL}/offers/apply`,
				{ code: couponCode },
				{ headers: getAuthHeaders() }
			);
			console.log("the response is :", response);
			console.log(response.data);

			return response.data;
		} catch (error) {
			console.error("Coupon apply error:", error);

			return {
				success: false,
				message:
					error.response?.data?.message ||
					"Invalid or expired coupon.",
			};
		}
	};

	const clearCart = async () => {
		try {
			const response = await axios.delete(`${API_URL}/cart/clear`, {
				headers: getAuthHeaders(),
			});

			dispatch({
				type: "CLEAR_CART",
				payload: response.data.data,
			});
		} catch (error) {
			dispatch({ type: "FETCH_CART_ERROR", payload: error.message });
			throw error;
		}
	};

	return (
		<CartContext.Provider
			value={{
				state,
				addToCart,
				fetchCart,
				updateCartItem,
				removeCartItem,
				applyCoupon,
				clearCart,
			}}>
			{children}
		</CartContext.Provider>
	);
};

CartProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export { CartContext };
