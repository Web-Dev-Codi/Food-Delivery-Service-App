import { Schema, model } from "mongoose";

const CouponSchema = new Schema(
	{
		code: { type: String, required: true },
		description: { type: String, required: true },

		discount: {
			type: Number,
			required: true,
			validate: {
				validator: function (v) {
					return v > 0;
				},
				message: "Discount must be greater than 0",
			},
		},

		validFrom: { type: Date, required: true }, // Required to define start date
		validUntil: { type: Date, required: true }, // Required to define expiry
		
		usedBy: [{ type: Schema.Types.ObjectId, ref: "User" }], // ✅ Track per-user usage
		applicableToRestaurants: [
			{ type: Schema.Types.ObjectId, ref: "Restaurant" },
		], // Linked to Restaurants
		isActive: { type: Boolean }, // Determines if the coupon is active
	},
	{ timestamps: true } // Automatically manages createdAt and updatedAt
);

// Virtual property to check if the coupon is currently valid
CouponSchema.virtual("isValid").get(function () {
	const now = new Date(); // Gets the current date and time
	return this.isActive && now >= this.validFrom && now <= this.validUntil;
});

CouponSchema.pre("save", function (next) {
	if (this.validUntil < new Date()) {
		this.isActive = false;
	} else {
		this.isActive = true;
	}
	next();
});



const Coupon = model("Coupon", CouponSchema);
export default Coupon;
