import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import CartItems from "./CartItems";

function Cart() {
  const { cart, total, loading, error, clearCart } = useCart();
  const navigate = useNavigate();

  // We don't need to check for token anymore since we support guest carts

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error)
    return (
      <div className="text-center p-4 text-red-600">
        {error}
        {!localStorage.getItem("token") && (
          <button
            className="ml-2 text-blue-600 underline"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </div>
    );

  if (!cart || cart.length === 0) {
    return (
      <div className="text-center p-4">
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Cart</h2>
        <button
          onClick={clearCart}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Clear Cart
        </button>
      </div>

      <div className="space-y-4 mb-6">
        {Array.isArray(cart) &&
          cart.map((item) => (
            <CartItems key={item._id || item.menuItem} item={item} />
          ))}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-semibold">Total:</span>
          <span className="text-2xl font-bold">${total.toFixed(2)}</span>
        </div>
        <button
          onClick={() => navigate("/checkout")}
          className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition-colors"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
