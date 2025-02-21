import { Router } from "express";
import { createPaymentIntent } from "../controllers/payment.js";
import { verifyToken } from "../middleware/auth.js";

const paymentRouter = Router();

// ✅ Payment Routes
paymentRouter.post("/create-payment-intent",verifyToken, createPaymentIntent);

export default paymentRouter;
