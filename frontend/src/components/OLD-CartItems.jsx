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
							onQuantityChange((e) =>
								onQuantityChange(
									item.foodItemId._id,
									e.target.value
								)
							)
						}
						className="px-3 py-1 text-gray-600 hover:bg-gray-100"
						disabled={isProcessed}></button>
					<span className="px-3 py-1">{item.quantity}</span>
					{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
					<button
						onClick={() =>
							onQuantityChange((e) =>
								onQuantityChange(
									item.foodItemId._id,
									e.target.value
								)
							)
						}
						className="px-3 py-1 text-gray-600 hover:bg-gray-100">
						+
					</button>
				</div>
				{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
				<button
					onClick={() => onRemoveClick(item.foodItemId._id)}
					className="text-red-500 hover:text-red-700">
					Remove
				</button>
			</div>
		</div>
		// <li className="flex items-center gap-4">
		// 	<img
		// 		src={item.foodItemId?.imageUrl}
		// 		alt={item.foodItemId?.name}
		// 		className="size-16 rounded-sm object-cover"
		// 	/>
		// 	<div className="">
		// 		<h3 className="text-sm text-gray-900">
		// 			{item.foodItemId.name}
		// 		</h3>
		// 		<dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
		// 			<div>
		// 				<dt className="inline">Price:</dt>
		// 				<dd className="inline">
		// 					€{item.foodItemId.price.toFixed(2)}
		// 				</dd>
		// 			</div>

		// 			<div>
		// 				<dt className="inline">Description:</dt>
		// 				<dd className="inline">
		// 					{item.foodItemId.description}
		// 				</dd>
		// 			</div>
		// 		</dl>
		// 		<div className="flex flex-1 items-center justify-end gap-2">
		// 			<form>
		// 				<label
		// 					htmlFor={`quantity-${item._id}`}
		// 					className="text-sm font-medium text-gray-700">
		// 					Quantity:
		// 				</label>
		// 				<input
		// 					type="number"
		// 					id={`quantity-${item._id}`}
		// 					name="quantity"
		// 					value={item.quantity}
		// 					min="1"
		// 					disabled={isProcessed}
		// 					onChange={(e) =>
		// 						onQuantityChange(
		// 							item.foodItemId._id,
		// 							e.target.value
		// 						)
		// 					}
		// 					className="h-8 w-12 rounded-sm border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-hidden [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
		// 				/>
		// 			</form>
		// 		</div>
		// 		<button
		// 			className={`text-gray-600 transition hover:text-red-600 ${
		// 				isProcessed ? "cursor-not-allowed opacity-50" : ""
		// 			}`}
		// 			onClick={() => onRemoveClick(item.foodItemId._id)}
		// 			disabled={isProcessed}>
		// 			<span className="sr-only">Remove item</span>
		// 			<svg
		// 				xmlns="http://www.w3.org/2000/svg"
		// 				fill="none"
		// 				viewBox="0 0 24 24"
		// 				strokeWidth="1.5"
		// 				stroke="currentColor"
		// 				className="size-4">
		// 				<path
		// 					strokeLinecap="round"
		// 					strokeLinejoin="round"
		// 					d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
		// 				/>
		// 			</svg>
		// 		</button>
		// 		{/* <button
		// 			className={`mt-2 text-red-500 ${
		// 				isProcessed ? "cursor-not-allowed opacity-50" : ""
		// 			}`}
		// 			onClick={() => onRemoveClick(item.foodItemId._id)}
		// 			disabled={isProcessed}>
		// 			Remove
		// 		</button> */}
		// 	</div>
		// </li>
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

CartItems.defaultProps = {
	isProcessed: false,
};

export default CartItems;
