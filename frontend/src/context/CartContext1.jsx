/* import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext"; 
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { state, fetchCart, updateCartItem, removeCartItem, applyCoupon } = useContext(CartContext);
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const [discountMessage, setDiscountMessage] = useState("");

  useEffect(() => {
    fetchCart(); // Fetch cart on mount
  }, []);

  useEffect(() => {
    if (state.cart?.status?.toLowerCase() === "processed") {
      console.log("Cart is processed, redirecting to home page");
      navigate("/");
    }
  }, [state.cart?.status, navigate]);

  if (state.error) {
    return <div className="text-red-500">Error: {state.error}</div>;
  }

  const handleQuantityChange = (foodItemId, quantity) => {
    const quantityInt = parseInt(quantity, 10);
    if (quantityInt > 0) {
      updateCartItem(foodItemId, quantityInt);
    }
  };

  const handleRemoveClick = (foodItemId) => {
    console.log("Removing item:", foodItemId);
    removeCartItem(foodItemId);
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setDiscountMessage("⚠️ Please enter a valid coupon code.");
      return;
    }

    try {
      await applyCoupon(couponCode);
      setDiscountMessage("🎉 Coupon applied successfully!");
    } catch (error) {
      setDiscountMessage("❌ Invalid or expired coupon.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">
        Your cart status: <span className="font-bold text-blue-600">{state.cart?.status || "Active"}</span>
      </h1>

      {state.cart?.items?.length === 0 ? (
        <p className="text-lg text-gray-500">Your cart is empty</p>
      ) : (
        <div className="space-y-6">
          {state.cart?.items?.map((item) => (
            <div key={item.foodItemId._id} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm">
              <img src={item.foodItemId.imageUrl} alt={item.foodItemId.name} className="w-24 h-24 object-cover rounded-md" />
              <div className="flex-1 ml-4">
                <h3 className="text-xl font-medium">{item.foodItemId.name}</h3>
                <p className="text-sm text-gray-600">Price: €{item.foodItemId.price.toFixed(2)}</p>
                <p className="text-sm text-gray-600">Subtotal: €{item.subtotal.toFixed(2)}</p>

                <div className="mt-2 flex items-center space-x-4">
                  <label htmlFor={`quantity-${item._id}`} className="text-sm font-medium text-gray-700">
                    Quantity:
                  </label>
                  <input
                    type="number"
                    id={`quantity-${item._id}`}
                    name="quantity"
                    value={item.quantity}
                    min="1"
                    disabled={state.cart?.status?.toLowerCase() === "processed"}
                    onChange={(e) => handleQuantityChange(item.foodItemId._id, e.target.value)}
                    className="w-16 p-2 border border-gray-300 rounded-md text-center"
                  />
                </div>
                <button 
                  className={`mt-2 text-red-500 ${state.cart?.status?.toLowerCase() === "processed" ? "cursor-not-allowed opacity-50" : ""}`}
                  onClick={() => handleRemoveClick(item.foodItemId._id)}
                  disabled={state.cart?.status?.toLowerCase() === "processed"}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {state.cart?.status?.toLowerCase() !== "processed" && (
        <div className="mt-6 flex items-center space-x-4">
          <input
            type="text"
            placeholder="Enter Coupon Code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-1/3"
          />
          <button
            onClick={handleApplyCoupon}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
          >
            Apply Coupon
          </button>
        </div>
      )}

      {discountMessage && <p className="mt-2 text-sm font-medium text-green-600">{discountMessage}</p>}

      {state.cart?.items?.length > 0 && (
        <div className="mt-6 text-right">
          <h2 className="text-2xl font-semibold">Total Amount: €{state.cart?.finalAmount?.toFixed(2)}</h2>
        </div>
      )}

      {state.cart?.items?.length > 0 && state.cart?.status?.toLowerCase() !== "processed" && (
        <div className="mt-8 text-center">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-full text-lg hover:bg-blue-600 transition duration-200"
            onClick={() => navigate("/payment")}
          >
            Proceed to Checkout
          </button>
          <button 
            className="bg-red-500 text-white px-6 py-2 rounded-full text-lg hover:bg-red-600 transition duration-200 ml-4"
            onClick={() => navigate("/restaurants")}
          >
            Continue Ordering Food
          </button>
        </div>
      )}

      {state.cart?.status?.toLowerCase() === "processed" && (
        <div className="mt-6 text-center text-green-600 text-lg font-semibold">
          🎉 Your order has been placed! Redirecting to orders...
        </div>
      )}
    </div>
  );
};

export default Cart;
 */


import { createContext, useReducer, useEffect } from "react";
import axios from "axios";

// Initial state
const initialState = {
  cart: [],
  totalAmount: 0,
  error: null,
};

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
        return { ...state, cart: { ...state.cart, items: action.payload } };
      
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.foodItemId !== action.payload.foodItemId),
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
        cart: action.payload,
        totalAmount: action.payload.totalAmount,
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
    try {
      const response = await axios.get("http://localhost:8000/cart/get", { headers: getAuthHeaders() });
      dispatch({ type: "FETCH_CART_SUCCESS", payload: { 
        items: response.data.data.items || [],
        totalAmount: response.data.data.finalAmount || 0 
      } });
      
    } catch (error) {
      dispatch({ type: "FETCH_CART_ERROR", payload: error.message });
    }
  };

  useEffect(() => {
    fetchCart(); // Fetch cart on mount
  }, []);

  // Add to Cart
  const addToCart = async (payload) => {
    try {
      const response = await axios.post("http://localhost:8000/cart/add", payload, { headers: getAuthHeaders() });
      dispatch({ type: "ADD_TO_CART", payload: response.data.data.items });
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

      dispatch({ type: "FETCH_CART_SUCCESS", payload: response.data.data });
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
        "http://localhost:8000/offers/applycoupon",
        { code: couponCode },
        { headers: getAuthHeaders() }
      );

      dispatch({ type: "FETCH_CART_SUCCESS", payload: response.data.data });
      setDiscountMessage(`🎉 Coupon applied! Discount: €${response.data.discount}`);
    } catch (error) {
      dispatch({ type: "FETCH_CART_ERROR", payload: error.response?.data?.message || error.message });
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };
