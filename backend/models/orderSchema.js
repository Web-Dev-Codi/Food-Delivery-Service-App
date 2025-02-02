import { Schema, model } from "mongoose";

const OrderItemSchema = new Schema({
	menuItem: { type: Schema.Types.ObjectId, ref: "MenuItem", required: true },
	quantity: { type: Number, required: true, min: 1 },
	price: { type: Number, required: true }, // Price at the time of order
	specialInstructions: { type: String },
});

const OrderSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: "User", required: true },
		restaurant: {
			type: Schema.Types.ObjectId,
			ref: "Restaurant",
			required: true,
		},
		items: [OrderItemSchema],
		status: {
			type: String,
			enum: [
				"pending",
				"confirmed",
				"preparing",
				"out_for_delivery",
				"delivered",
				"cancelled",
			],
			default: "pending",
		},
		totalAmount: { type: Number, required: true },
		deliveryAddress: {
			street: { type: String, required: true },
			city: { type: String, required: true },
			postalCode: { type: String, required: true },
			country: { type: String, required: true },
		},
		deliveryInstructions: { type: String },
		paymentStatus: {
			type: String,
			enum: ["pending", "completed", "failed"],
			default: "pending",
		},
		paymentMethod: {
			type: String,
			enum: ["credit_card", "debit_card", "cash"],
			required: true,
		},
		estimatedDeliveryTime: { type: Date },
		actualDeliveryTime: { type: Date },
		deliveryFee: { type: Number },
		driver: { type: Schema.Types.ObjectId, ref: "User" }, // Assuming drivers are also users with a special role
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

// Virtual field to calculate the time elapsed since order creation
OrderSchema.virtual("orderAge").get(function () {
	return Date.now() - this.createdAt;
});

// Middleware to update total amount before saving
OrderSchema.pre("save", function (next) {
	if (this.isModified("items")) {
		this.totalAmount = this.items.reduce((total, item) => {
			return total + item.price * item.quantity;
		}, 0);

		if (this.deliveryFee) {
			this.totalAmount += this.deliveryFee;
		}
	}
	next();
});

export default model("Order", OrderSchema);
