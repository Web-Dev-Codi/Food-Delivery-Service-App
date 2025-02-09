import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
	foodItem: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "FoodItem",
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
		min: 1,
	},
});

const cartSchema = new mongoose.Schema(
	{
		cartId: {
			type: String,
			required: true,
		},
		userId: {
			type: String,
			required: true, // This will store either the user ID or guest ID
		},
		isGuest: {
			type: Boolean,
			default: true,
		},
		items: [cartItemSchema],
		total: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
