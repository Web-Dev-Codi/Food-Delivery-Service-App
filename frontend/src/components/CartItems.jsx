import PropTypes from "prop-types";

function CartItems({ item, onQuantityChange, onRemoveClick, isProcessed }) {
	return (
		<div className="flex items-center justify-between p-4 border-b border-gray-200">
			<div className="flex items-center space-x-4">
				{item.foodItemId?.imageUrl && (
					<img
						src={item.foodItemId?.imageUrl}
						alt={item.foodItemId?.name || "Menu Item"}
						className="w-20 h-20 object-cover rounded-md"
					/>
				)}
				<div>
					<h3 className="font-semibold text-lg">
						{item.foodItemId?.name ||
							`Menu Item ${item.foodItemId?.name}`}
					</h3>
					{item.foodItemId?.description && (
						<p className="text-gray-600">
							{item.foodItemId?.description}
						</p>
					)}
					<p className="text-green-600 font-medium">
						${Number(item.foodItemId?.price).toFixed(2)}
					</p>
				</div>
			</div>

			<div className="flex items-center space-x-4">
				<div className="flex items-center border rounded-md">
					{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
					<button
						onClick={() =>
							onQuantityChange(
								item.foodItemId?._id,
								Math.max(1, item.quantity - 1)
							)
						}
						className="px-3 py-1 text-gray-600 hover:bg-gray-100"
						disabled={isProcessed}>
						-
					</button>
					<span className="px-3 py-1">{item.quantity}</span>
					{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
					<button
						onClick={() =>
							onQuantityChange(
								item.foodItemId?._id,
								item.quantity + 1
							)
						}
						className="px-3 py-1 text-gray-600 hover:bg-gray-100"
						disabled={isProcessed}>
						+
					</button>
				</div>
				{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
				<button
					onClick={() => onRemoveClick(item.foodItemId?._id)}
					className="text-red-500 hover:text-red-700">
					Remove
				</button>
			</div>
		</div>
	);
}

CartItems.propTypes = {
	item: PropTypes.shape({
		_id: PropTypes.string,
		foodItemId: PropTypes.shape({
			_id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			description: PropTypes.string,
			price: PropTypes.number.isRequired,
			imageUrl: PropTypes.string,
		}).isRequired,
		quantity: PropTypes.number.isRequired,
		subtotal: PropTypes.number.isRequired,
	}).isRequired,
	onQuantityChange: PropTypes.func.isRequired,
	onRemoveClick: PropTypes.func.isRequired,
	isProcessed: PropTypes.bool,
};

export default CartItems;
