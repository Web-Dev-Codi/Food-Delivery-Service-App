import { Router } from "express";
import { createPaymentIntent, getPaymentByCart } from "../controllers/payment.js";
import { verifyToken } from "../middleware/auth.js";

const paymentRouter = Router();

// ✅ Payment Routes
paymentRouter.post("/create-payment-intent",verifyToken, createPaymentIntent);
paymentRouter.post("/save-order/:cartId",verifyToken, getPaymentByCart);

export default paymentRouter;
