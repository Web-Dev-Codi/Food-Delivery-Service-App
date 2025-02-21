import { Schema, model } from "mongoose";

const paymentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    stripePaymentIntentId: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    cartId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Cart",
      },
    ],
    status: {
      type: String,
      enum: ["Pending", "Succeeded", "Failed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Payment = model("Payment", paymentSchema);
export default Payment;
