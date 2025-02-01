import { useContext } from "react";
import { cartContext } from "../contexts/CartContext";

const Cart = () => {
  const { items, total, removeItem, updateQuantity, clearCart, loading } =
    useContext(cartContext);

  if (loading) {
    return <div className="p-4 text-center">Loading cart...</div>;
  }

  if (!items || items.length === 0) {
    return <div className="p-4 text-center">Your cart is empty</div>;
  }

  const handleQuantityChange = (itemId, value) => {
    const newQuantity = parseInt(value, 10);
    if (isNaN(newQuantity) || newQuantity < 1) return;
    updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      removeItem(itemId);
    }
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      clearCart();
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 border rounded hover:border-gray-400 transition-colors"
          >
            <div className="flex-grow">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">
                $
                {typeof item.price === "number"
                  ? item.price.toFixed(2)
                  : "0.00"}
              </p>
              <p className="text-sm text-gray-500">
                Subtotal: $
                {typeof item.price === "number" &&
                typeof item.quantity === "number"
                  ? (item.price * item.quantity).toFixed(2)
                  : "0.00"}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                className="w-16 p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Quantity"
              />
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="px-3 py-1 text-red-600 border border-red-600 rounded hover:bg-red-50 transition-colors"
                aria-label="Remove item"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between items-center">
        <p className="text-xl font-bold">
          Total: ${typeof total === "number" ? total.toFixed(2) : "0.00"}
        </p>
        <div className="space-x-4">
          <button
            onClick={handleClearCart}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            disabled={items.length === 0}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
