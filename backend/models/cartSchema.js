import { Schema, model } from "mongoose";

const CartItemSchema = new Schema({
	menuItem: {
		type: Schema.Types.ObjectId,
		ref: "FoodItem",
		required: true,
	},
	quantity: { type: Number, required: true, min: 1 },
});

const CartSchema = new Schema(
	{
		cartId: {
			type: Schema.Types.ObjectId,
			unique: true,
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: function () {
				return !this.isGuestCart;
			},
		},
		guestId: {
			type: Schema.Types.ObjectId,
			required: function () {
				return this.isGuestCart;
			},
		},
		isGuestCart: {
			type: Boolean,
			required: true,
		},
		lastAccessed: {
			type: Date,
			default: Date.now,
		},
		items: [CartItemSchema],
		total: {
			type: Number,
			default: 0,
			get: (v) => Number(v.toFixed(2)),
			set: (v) => Number(v.toFixed(2)),
		},
	},
	{ timestamps: true }
);

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

// Update lastAccessed timestamp on find
CartSchema.pre(/^find/, function (next) {
	if (!this._update) {
		this._update = {};
	}
	this._update.lastAccessed = new Date();
	next();
});

// Add indexes for better query performance
CartSchema.index({ user: 1 });
CartSchema.index({ guestId: 1 });
CartSchema.index({ lastAccessed: 1 });
CartSchema.index({ isGuestCart: 1 });

export default model("Cart", CartSchema);
