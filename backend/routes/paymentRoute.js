
import { Router } from 'express';
import { createPaymentIntent } from '../controllers/payment.js';

const paymentRouter = Router();

// ✅ Payment Routes
paymentRouter.post('/create-payment-intent/:userId', createPaymentIntent);


export default paymentRouter;
