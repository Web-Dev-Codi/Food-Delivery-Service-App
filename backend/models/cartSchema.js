import { Schema, model } from "mongoose";

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    items: [
      {
        foodItemId: {
          type: Schema.Types.ObjectId,
          ref: "FoodItem",
        },
        quantity: {
          type: Number,
          min: 1,
          default: 1,
        },
        price: {
          type: Number,
        },
        subtotal: {
          type: Number,
          default: 0,
        },
      },
    ],
    totalAmount: {
      type: Number,
      default: 0, // Before discount
    },
    discount: {
      type: Number,
      default: 0, // Discount applied
    },
    finalAmount: {
      type: Number,
      default: 0, // After discount
    },
    appliedCoupon: {
      type: Schema.Types.ObjectId,
      ref: "Coupon",
      default: null, // Store applied coupon
    },
    status: {
      type: String,
      enum: ["Active", "Processed"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  },
);

cartSchema.pre("save", async function (next) {
  // Populate food item details
  await this.populate("items.foodItemId", "price");

  this.items.forEach((item) => {
    item.subtotal = item.foodItemId.price * item.quantity;
  });

  this.totalAmount = this.items.reduce(
    (total, item) => total + item.subtotal,
    0,
  );

  // Apply discount and calculate final amount
  this.finalAmount = this.totalAmount - this.discount;

  next();
});

const Cart = model("Cart", cartSchema);
export default Cart;
