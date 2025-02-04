import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const CartItemSchema = new Schema({
	menuItem: {
		type: Schema.Types.Mixed,
		required: true,
		validate: {
			validator: function (v) {
				return (
					mongoose.Types.ObjectId.isValid(v) || typeof v === "string"
				);
			},
			message: "Invalid menuItem ID format",
		},
	},
	name: {
		type: String,
		required: true
	},
	quantity: {
		type: Number,
		required: true,
		min: 1,
	},
	price: {
		type: Number,
		required: true,
		min: 0,
	},
	imageUrl: {
		type: String,
		required: false
	},
	description: {
		type: String,
		required: false
	}
});

const CartSchema = new Schema({
	cartId: {
		type: String,
		required: true,
		unique: true,
		default: () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
	},
	user: {
		type: String,
		required: true,
	},
	isGuestCart: {
		type: Boolean,
		default: false,
	},
	items: [CartItemSchema],
	total: {
		type: Number,
		default: 0,
		get: (v) => Number(v.toFixed(2)),
		set: (v) => Number(v.toFixed(2)),
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

// Update total when items change
CartSchema.pre("save", function (next) {
	const calculatedTotal = this.items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);
	this.total = Number(calculatedTotal.toFixed(2));
	this.updatedAt = new Date();
	next();
});

// Add index for better query performance
CartSchema.index({ user: 1 });

export default model("Cart", CartSchema);
