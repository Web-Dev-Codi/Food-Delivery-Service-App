/* import PropTypes from "prop-types";
import { useCart } from "../context/CartContext";

function CartItems({ item }) {
	const { updateQuantity, removeFromCart } = useCart();
	const menuItem = item.menuItem || item;

	return (
		<div className="flex items-center justify-between p-4 border-b border-gray-200">
			<div className="flex items-center space-x-4">
				{menuItem.imageUrl && (
					<img
						src={menuItem.imageUrl}
						alt={menuItem.name || "Menu Item"}
						className="w-20 h-20 object-cover rounded-md"
					/>
				)}
				<div>
					<h3 className="font-semibold text-lg">
						{menuItem.name || `Menu Item ${menuItem.name}`}
					</h3>
					{menuItem.description && (
						<p className="text-gray-600">{menuItem.description}</p>
					)}
					<p className="text-green-600 font-medium">
						${Number(menuItem.price).toFixed(2)}
					</p>
				</div>
			</div>

			<div className="flex items-center space-x-4">
				<div className="flex items-center border rounded-md">
					{/* biome-ignore lint/a11y/useButtonType: <explanation> 
					<button
						onClick={() =>
							updateQuantity(
								menuItem._id,
								Math.max(1, item.quantity - 1)
							)
						}
						className="px-3 py-1 text-gray-600 hover:bg-gray-100"
						disabled={item.quantity <= 1}>
						-
					</button>
					<span className="px-3 py-1">{item.quantity}</span>
					{/* biome-ignore lint/a11y/useButtonType: <explanation> 
					<button
						onClick={() =>
							updateQuantity(menuItem._id, item.quantity + 1)
						}
						className="px-3 py-1 text-gray-600 hover:bg-gray-100">
						+
					</button>
				</div>
				{/* biome-ignore lint/a11y/useButtonType: <explanation> 
				<button
					onClick={() => removeFromCart(menuItem._id)}
					className="text-red-500 hover:text-red-700">
					Remove
				</button>
			</div>
		</div>
	);
}

CartItems.propTypes = {
	item: PropTypes.shape({
		menuItem: PropTypes.shape({
			_id: PropTypes.string,
			name: PropTypes.string,
			description: PropTypes.string,
			price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
			imageUrl: PropTypes.string,
		}),
		quantity: PropTypes.number.isRequired,
	}).isRequired,
};

export default CartItems;
 */