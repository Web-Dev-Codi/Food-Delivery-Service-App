import { cartContext } from "../contexts/CartContext";
import { useContext } from "react";

const Cart = () => {
  const { items, total, removeItem, updateQuantity, clearCart } =
    useContext(cartContext);

  if (items.length === 0) {
    return <div className="p-4 text-center">Your cart is empty</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 border rounded"
          >
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">${item.price}</p>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, e.target.value)}
                className="w-16 p-1 border rounded"
              />
              <button
                onClick={() => removeItem(item.id)}
                className="px-3 py-1 text-red-600 border border-red-600 rounded hover:bg-red-50"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between items-center">
        <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
        <button
          onClick={clearCart}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
