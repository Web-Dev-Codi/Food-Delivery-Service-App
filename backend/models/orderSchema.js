import { Schema, model } from "mongoose";
import path from "path";

const OrderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Populate for address
    cartId: { type: Schema.Types.ObjectId, ref: "Cart", required: true, unique: true }, 
    paymentId: { type: Schema.Types.ObjectId, ref: "Payment", required: true }, // Linked Payment
    
    status: {
      type: String,
      enum: ["pending", "confirmed", "preparing", "out_for_delivery", "delivered", "cancelled"],
      default: "pending",
    },

    isPaid: { type: Boolean, default: false }, // Derived from Payment
    totalAmount: { type: Number}, 

  
    estimatedDeliveryTime: { type: Date },
    actualDeliveryTime: { type: Date },
    
  },
  { timestamps: true }
);

OrderSchema.pre("save", async function (next) {
  this.actualDeliveryTime = new Date();
  next();
}
);

// ✅ Auto-set estimated delivery time when order is created
OrderSchema.pre("save", function (next) {
  if (!this.estimatedDeliveryTime) { // Only set if not already set
    this.estimatedDeliveryTime = new Date(Date.now() + 30 * 60000); // 30 min after order time
  }
  next();
});

// ✅ Auto-set ispaid status when payment is confirmed
OrderSchema.pre("save", async function (next) {
  const payment = await this.model("Payment").findById(this.paymentId);
  if (payment.status === "Succeeded") {
    this.isPaid = true;
  }
  else {
    this.isPaid = false;
  }
  next();
});


//populate cartId, paymentId, userId
OrderSchema.pre(/^find/, function(next) {
  this.populate({
      path: "cartId",
      populate: {
          path: "items.foodItemId",
          model: "FoodItem",
          select: "name price description imageUrl category availability"
      }
  })
  .populate("userId", "name email address contact")
  .populate("paymentId", "amount status");
  
  next();
});





const Order =  model("Order", OrderSchema);
export default Order;
