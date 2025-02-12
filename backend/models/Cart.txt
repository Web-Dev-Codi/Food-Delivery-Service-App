import { Schema, model } from "mongoose";

const CartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        foodItemId: {
          type: Schema.Types.ObjectId,
          ref: "FoodItem",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    total: {
      type: Number,
      default: 0,
      get: (v) => Number(v.toFixed(2)),
      set: (v) => Number(v.toFixed(2)),
    },
    lastAccessed: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

// Update total when items change
CartSchema.pre("save", function (next) {
  const calculatedTotal = this.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
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
