/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

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
				cart: state.cart.filter(
					(item) => item.foodItemId !== action.payload.foodItemId
				),
			};

		case "UPDATE_QUANTITY":
			return {
				...state,
				cart: state.cart.map((item) =>
					item.foodItemId === action.payload.foodItemId
						? { ...item, quantity: action.payload.quantity }
						: item
				),
				totalAmount: action.payload.totalAmount,
			};

		case "FETCH_CART_SUCCESS":
			return {
				...state,
				cart: action.payload || {
					items: [],
					totalAmount: 0,
					discount: 0,
					finalAmount: 0,
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

	// Fetch Cart
	const fetchCart = async () => {
		const token = localStorage.getItem("token");
		if (!token) return;

		try {
			const response = await axios.get("http://localhost:8000/cart/get", {
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
			const response = await axios.post(
				"http://localhost:8000/cart/add",
				payload,
				{ headers: getAuthHeaders() }
			);
			dispatch({
				type: "ADD_TO_CART",
				payload: response.data.data.items,
			});
		} catch (err) {
			console.error("Error adding to cart:", err);
			dispatch({ type: "FETCH_CART_ERROR", payload: err.message });
		}
	};

	// Update Cart Item Quantity
	const updateCartItem = async (foodItemId, quantity) => {
		try {
			const response = await axios.put(
				"http://localhost:8000/cart/update",
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
			await axios.delete("http://localhost:8000/cart/deleteitem", {
				data: { items: [{ foodItemId }] },
				headers: getAuthHeaders(),
			});

			dispatch({ type: "REMOVE_FROM_CART", payload: { foodItemId } });
		} catch (error) {
			dispatch({ type: "FETCH_CART_ERROR", payload: error.message });
		}
	};

	// Apply Coupon Code
	const applyCoupon = async (couponCode, setDiscountMessage) => {
		try {
			const response = await axios.post(
				"http://localhost:8000/offers/apply",
				{ code: couponCode },
				{ headers: getAuthHeaders() }
			);

			dispatch({
				type: "FETCH_CART_SUCCESS",
				payload: response.data.data,
			});
			setDiscountMessage(
				`🎉 Coupon applied! Discount: €${response.data.discount}`
			);
		} catch (error) {
			dispatch({
				type: "FETCH_CART_ERROR",
				payload: error.response?.data?.message || error.message,
			});
			setDiscountMessage("❌ Invalid or expired coupon.");
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
			}}>
			{children}
		</CartContext.Provider>
	);
};

CartProvider.propTypes = {
	children: PropTypes.node.isRequired
};

export { CartContext };
