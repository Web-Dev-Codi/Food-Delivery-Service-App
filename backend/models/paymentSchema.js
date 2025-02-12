import { Schema,model } from "mongoose";

const paymentSchema = new  Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },


   /*  orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      default: null, // Can be linked later
    }, */
    stripePaymentIntentId: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Succeeded", "Failed"],
      default: "Pending",
    },
   
  },
  { timestamps: true }
);

const Payment = model("Payment", paymentSchema);
export default Payment
