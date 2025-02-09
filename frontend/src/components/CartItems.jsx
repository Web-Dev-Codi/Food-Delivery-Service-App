import PropTypes from "prop-types";
import { useCart } from "../context/CartContext";

function CartItems({ item }) {
	const { updateQuantity, removeFromCart } = useCart();

	return (
		<div className="flex items-center justify-between p-4 border-b border-gray-200">
			<div className="flex items-center space-x-4">
				{item.imageUrl && (
					<img
						src={item.imageUrl}
						alt={item.name || 'Menu Item'}
						className="w-20 h-20 object-cover rounded-md"
					/>
				)}
				<div>
					<h3 className="font-semibold text-lg">{item.name || `Menu Item ${item._id}`}</h3>
					{item.description && <p className="text-gray-600">{item.description}</p>}
					<p className="text-green-600 font-medium">
						${Number(item.price).toFixed(2)}
					</p>
				</div>
			</div>

			<div className="flex items-center space-x-4">
				<div className="flex items-center border rounded-md">
					<button
						onClick={() =>
							updateQuantity(
								item._id,
								Math.max(1, item.quantity - 1)
							)
						}
						className="px-3 py-1 text-gray-600 hover:bg-gray-100"
						disabled={item.quantity <= 1}>
						-
					</button>
					<span className="px-3 py-1">{item.quantity}</span>
					<button
						onClick={() =>
							updateQuantity(item._id, item.quantity + 1)
						}
						className="px-3 py-1 text-gray-600 hover:bg-gray-100">
						+
					</button>
				</div>
				<button
					onClick={() => removeFromCart(item._id)}
					className="text-red-500 hover:text-red-700">
					Remove
				</button>
			</div>
		</div>
	);
}

CartItems.propTypes = {
	item: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		name: PropTypes.string,
		description: PropTypes.string,
		price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		quantity: PropTypes.number.isRequired,
		imageUrl: PropTypes.string,
	}).isRequired,
};

export default CartItems;
