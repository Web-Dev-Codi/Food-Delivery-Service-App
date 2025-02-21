import Stripe from "stripe";
import Payment from "../models/paymentSchema.js";
import dotenv from "dotenv";
import { sendPaymentSuccessEmail } from "./emailService.js";
import Cart from "../models/cartSchema.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//create Pyment Intent
export const createPaymentIntent = async (req, res) => {
    const userId = req.userId;
    console.log("Received userId in backend:", userId); 

    if (!userId) {
        return res.status(400).json({ message: "User ID is missing in request!" });
    }

    try {
        // Step 1: Fetch the user's cart
        const cart = await Cart.findOne({ userId }).populate("items.foodItemId", "price");

        if (!cart || cart.items.length === 0) {
            return res.status(404).json({ message: "Cart is empty or not found" });
        }

        console.log("🛒 Cart found for user:", cart);

        // Step 2: Use totalAmount from the Cart 
        const totalAmount = cart.finalAmount || cart.totalAmount;
        const amountInCents = Math.round(totalAmount * 100);

        // Step 3: Create a Payment Intent in Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountInCents,
            currency: "eur",
            metadata: { integration_check: "accept_a_payment" },
        });

        // Step 4: Save the payment details in the database
        const payment = await Payment.create({
            userId,
            cartId: cart._id, // Save cart reference
            stripePaymentIntentId: paymentIntent.id,
            amount: totalAmount, // Store exact amount at payment time
            status: "Pending",
        });

        console.log("✅ Payment record created successfully:", payment);

        // Step 5: Respond with the clientSecret from the payment intent
        res.status(200).send({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
            data: payment,
        });

    } catch (error) {
        console.error("❌ Error creating payment intent:", error);
        res.status(500).json({
            message: "An error occurred while creating payment intent",
            error: error.message,
        });
    }
};


// Handle Stripe Webhooks (for payment success/failure)
export const handleStripeWebhook = async (req, res) => {
    console.log("⚡ Incoming Webhook Request");

    const sig = req.headers["stripe-signature"];
    if (!sig) {
        console.error("❌ Missing Stripe signature in webhook request!");
        return res.status(400).send("Missing Stripe Signature");
    }

    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        console.log("✅ Webhook Verified:", event.type);
    } catch (err) {
        console.error("❌ Webhook verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
        switch (event.type) {
            case "payment_intent.succeeded":
                const paymentIntent = event.data.object;
                console.log("✅ PaymentIntent was successful! ID:", paymentIntent.id);

                const updatedPayment = await Payment.findOneAndUpdate(
                    { stripePaymentIntentId: paymentIntent.id },
                    { status: "Succeeded" },
                    { new: true }
                ).populate([
                    { 
                      path: "cartId", 
                      populate: { path: "items.foodItemId", select: "name price" } 
                    }, 
                    { path: "userId", select: "_id name email" }  
                ]);
                if (!updatedPayment) {
                    console.error("❌ Payment record NOT FOUND in DB!");
                    return res.status(404).json({ message: "Payment record not found" });
                }
                
                // Debugging logs
                console.log("✅ Populated Payment:", updatedPayment);
                console.log("🛒 Cart ID:", updatedPayment.cartId);
                console.log("👤 User ID:", updatedPayment.userId);
                if (!updatedPayment) {
                    console.error("❌ Payment record NOT FOUND in DB!");
                    return res.status(404).json({ message: "Payment record not found" });
                }

                console.log("✅ Payment updated in DB:", updatedPayment);

                if (updatedPayment.cartId && updatedPayment.cartId.length > 0) {
                    for (const cartId of updatedPayment.cartId) {
                        const updatedCart = await Cart.findByIdAndUpdate(
                            cartId,
                            { status: "Processed" },
                            { new: true }
                        );
                
                        if (updatedCart) {
                            console.log("✅ Cart status updated to Processed:", updatedCart);
                        } else {
                            console.error("❌ Cart not found for updating status.");
                        }
                    }
                } else {
                    console.warn("⚠️ No carts found to update.");
                }
                if (updatedPayment.userId) {
                    await sendPaymentSuccessEmail(updatedPayment.userId, updatedPayment);
                    console.log(`📧 Payment success email sent to: ${updatedPayment.userId.email}`);
                }
                break;

            case "payment_intent.payment_failed":
                const failedPaymentIntent = event.data.object;
                console.log("❌ PaymentIntent failed:", failedPaymentIntent.id);

                await Payment.findOneAndUpdate(
                    { stripePaymentIntentId: failedPaymentIntent.id },
                    { status: "Failed" },
                    { new: true }
                );
                break;

            default:
                console.log(`ℹ️ Unhandled event type: ${event.type}`);
        }

        res.status(200).send("Event received");
    } catch (err) {
        console.error("❌ Error handling webhook event:", err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
};

