import PropTypes from "prop-types";
import { Plus, Minus } from "lucide-react";
import { toast, Bounce } from "react-toastify";

function CartItems({ item, onQuantityChange, onRemoveClick, isProcessed }) {
	// Ensure foodItemId is an object, even if it's undefined
	const foodItem = item.foodItemId || {};

	return (
		<li className="flex items-center justify-between p-4 border-b border-gray-200">
			<div className="flex items-center space-x-4">
				{foodItem.imageUrl && (
					<img
						src={foodItem.imageUrl}
						alt={foodItem.name || "Menu Item"}
						className="w-20 h-20 object-cover rounded-md"
					/>
				)}
				<div>
					<h3 className="font-semibold text-lg">
						{foodItem.name || "Menu Item undefined"}
					</h3>

					<p className="text-green-600 font-medium">
						${Number(foodItem.price || 0).toFixed(2)}
					</p>
				</div>
			</div>

			<div className="flex flex-col md:flex-row items-center space-x-4">
				<div className="flex items-center border rounded-md">
					{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
					<button
						onClick={() => {
							if (foodItem._id) {
								onQuantityChange(
									foodItem._id,
									Math.max(1, item.quantity - 1),
									toast.warning(
										`Removed 1x ${
											foodItem.name || "item"
										} from cart`,
										{
											position: "bottom-right",
											autoClose: 3000,
											hideProgressBar: false,
											closeOnClick: false,
											pauseOnHover: true,
											draggable: false,
											transition: Bounce,
											theme: "dark",
											icon: <Minus />,
										}
									)
								);
							}
						}}
						className="px-3 py-1 text-gray-600 hover:bg-gray-100"
						disabled={isProcessed || !foodItem._id}>
						<Minus />
					</button>
					<span className="px-3 py-1">{item.quantity}</span>
					{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
					<button
						onClick={() => {
							if (foodItem._id) {
								onQuantityChange(
									foodItem._id,
									item.quantity + 1,
									toast.success(
										`Added 1x ${
											foodItem.name || "item"
										} to cart`,
										{
											position: "bottom-right",
											autoClose: 3000,
											hideProgressBar: false,
											closeOnClick: false,
											pauseOnHover: true,
											draggable: false,
											transition: Bounce,
											theme: "dark",
											icon: <Plus />,
										}
									)
								);
							}
						}}
						className="px-3 py-1 text-gray-600 hover:bg-gray-100"
						disabled={isProcessed || !foodItem._id}>
						<Plus />
					</button>
				</div>
				{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
				<button
					onClick={() => foodItem._id && onRemoveClick(foodItem._id)}
					className="text-red-500 hover:text-red-700"
					disabled={!foodItem._id}>
					Remove
				</button>
			</div>
		</li>
	);
}

CartItems.propTypes = {
	item: PropTypes.shape({
		_id: PropTypes.string,
		foodItemId: PropTypes.shape({
			_id: PropTypes.string,
			name: PropTypes.string,
			description: PropTypes.string,
			price: PropTypes.number,
			imageUrl: PropTypes.string,
		}),
		quantity: PropTypes.number.isRequired,
		subtotal: PropTypes.number.isRequired,
	}).isRequired,
	onQuantityChange: PropTypes.func.isRequired,
	onRemoveClick: PropTypes.func.isRequired,
	isProcessed: PropTypes.bool,
};

export default CartItems;
