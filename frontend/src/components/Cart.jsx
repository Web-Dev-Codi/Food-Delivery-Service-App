import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CartItems from "./CartItems";

function Cart() {
  const { cart, total, loading, error, clearCart, isGuest } = useCart();
  const navigate = useNavigate();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initializeCart = async () => {
      // Only create guest ID if not authenticated and no guest ID exists
      const token = localStorage.getItem("token");
      const guestId = localStorage.getItem("guestId");
      
      if (!token && !guestId) {
        const newGuestId = Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
        localStorage.setItem("guestId", newGuestId);
      }
      setInitialized(true);
    };

    initializeCart();
  }, []);

  // Show loading state only during initial load
  if (!initialized || loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4">
        <div className="text-red-600 mb-2">{error}</div>
        {!isGuest && !localStorage.getItem("token") && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => navigate("/login")}
          >
            Login to Continue
          </button>
        )}
      </div>
    );
  }

  // Check if cart exists and has items
  const hasItems = cart?.items && cart.items.length > 0;

  if (!hasItems) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        <p className="text-gray-600 mb-4">Your cart is empty</p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Cart</h2>
        <button
          onClick={clearCart}
          className="text-red-500 hover:text-red-700"
        >
          Clear Cart
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        {cart.items.map((item) => (
          <CartItems key={item.menuItem} item={item} />
        ))}
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-2xl font-bold">${total.toFixed(2)}</span>
        </div>

        <button
          onClick={() => navigate("/checkout")}
          className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
        >
          Proceed to Checkout
        </button>

        {isGuest && (
          <p className="mt-4 text-center text-gray-600">
            <button
              onClick={() => navigate("/login")}
              className="text-blue-500 hover:text-blue-700"
            >
              Login
            </button>{" "}
            or{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-blue-500 hover:text-blue-700"
            >
              Sign Up
            </button>{" "}
            to save your cart
          </p>
        )}
      </div>
    </div>
  );
}

export default Cart;
