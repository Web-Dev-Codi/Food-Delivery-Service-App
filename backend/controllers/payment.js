import Stripe from "stripe";
import User from "../models/userSchema.js";
import Payment from "../models/paymentSchema.js";
import dotenv from "dotenv";
import { sendPaymentSuccessEmail } from "./emailService.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//create Pyment Intent
export const createPaymentIntent = async (req, res) => {
	let { amount } = req.body;
	const { userId } = req.params;
	console.log("Received userId in backend:", userId); // Debugging step

	if (!userId) {
		return res
			.status(400)
			.json({ message: "User ID is missing in request!" });
	}

	console.log(
		"Received amount before conversion:",
		amount,
		"Type:",
		typeof amount
	);

	// Convert to a number if it's a string
	amount = Number(amount);

	console.log(
		"Received amount after conversion:",
		amount,
		"Type:",
		typeof amount
	);

	if (!amount || isNaN(amount)) {
		return res.status(400).json({
			message: "Invalid amount",
		});
	}
	try {
		// Step 1: Check if the user exists in the database
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({
				message: "User not found",
			});
		}

		const amountInCents = Math.round(Number(amount) * 100);

		// Step 2: Create a Payment Intent if the user exists
		const paymentIntent = await stripe.paymentIntents.create({
			amount: amountInCents,
			currency: "eur",
			metadata: { integration_check: "accept_a_payment" },
		});

		// Step 3: Save the payment details in the database
		try {
			const payment = await Payment.create({
				userId: userId,
				stripePaymentIntentId: paymentIntent.id,
				amount: paymentIntent.amount / 100,
				status: "Pending",
			});

			console.log("✅ Payment record created successfully:", payment);

			// Respond with the clientSecret from the payment intent
			res.status(200).send({
				clientSecret: paymentIntent.client_secret,
				paymentIntentId: paymentIntent.id,
				data: payment,
			});
		} catch (error) {
			console.error("❌ Error saving payment to DB:", error);
			res.status(500).json({
				message: "Error saving payment to DB",
				error: error.message,
			});
		}
	} catch (error) {
		console.error("An error occurred while creating payment intent", error);
		res.status(500).json({
			message: "An error occurred while creating payment intent",
			error: error.message,
		});
	}
};

// Handle Stripe Webhooks (for payment success/failure)
export const handleStripeWebhook = async (req, res) => {
	console.log("⚡ Incoming Webhook Request"); // EARLY LOG TO CHECK REQUESTS
	console.log("⚡ Webhook Called - Raw Body:", req.body); // 🔹 Log raw body for debugging

	const sig = req.headers["stripe-signature"];
	console.log("🔹 Webhook Signature:", sig); // Log the signature for debugging
	const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

	let event;
	try {
		// Make sure you're passing raw body and the correct headers for signature verification
		event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
		console.log("✅ Webhook Verified:", event.type);
		console.log("🔹 Webhook Full Event:", JSON.stringify(event, null, 2)); // Log full event
	} catch (err) {
		console.error("❌ Webhook verification failed:", err.message);
		return res.status(400).send(`Webhook Error: ${err.message}`);
	}

	try {
		switch (event.type) {
			case "payment_intent.succeeded":
				const paymentIntent = event.data.object; // Contains a Stripe PaymentIntent object
				console.log(
					"✅ PaymentIntent was successful! ID:",
					paymentIntent.id
				);

				// 🔹 Log PaymentIntent ID before updating MongoDB
				console.log(
					"🔹 Looking for Payment Record with Intent ID:",
					paymentIntent.id
				);

				const updatedPayment = await Payment.findOneAndUpdate(
					{ stripePaymentIntentId: paymentIntent.id },
					{ status: "Succeeded" },
					{ new: true }
				).populate("userId");

				if (!updatedPayment) {
					console.error("❌ Payment record NOT FOUND in DB!");
					return res
						.status(404)
						.json({ message: "Payment record not found" });
				}

				console.log("✅ Payment updated in DB:", updatedPayment);

				if (!updatedPayment.userId) {
					console.error("❌ User not found for email notification.");
				} else {
					await sendPaymentSuccessEmail(
						updatedPayment.userId,
						updatedPayment
					);
					console.log(
						`📧 Payment success email sent to: ${updatedPayment.userId.email}`
					);
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

		// Respond with a 200 status to acknowledge receipt of the event
		res.status(200).send("Event received");
	} catch (err) {
		console.error("❌ Error handling webhook event:", err.message);
		res.status(400).send(`Webhook Error: ${err.message}`);
	}
};
