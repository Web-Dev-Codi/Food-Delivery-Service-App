import React from "react";
import { useState, useEffect } from "react";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode

function PaymentForm() {
	const stripe = useStripe();
	const elements = useElements();
	const [paymentMethod, setPaymentMethod] = useState("card");
	const [loading, setLoading] = useState(false);
	const [userId, setUserId] = useState(null);
	const [message, setMessage] = useState("");

	// 🔥 Get userId from JWT stored in localStorage
	useEffect(() => {
		const token = localStorage.getItem("token"); // Get token from localStorage
		if (token) {
			const decoded = jwtDecode(token); // Decode JWT
			setUserId(decoded.userId); // Set userId from token
		} else {
			console.error("No token found in localStorage");
		}
	}, []);

	if (!userId) {
		return <p>Error: User ID is missing!</p>;
	}
	const totalAmount = 100;
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		if (!stripe || !elements) {
			setMessage("Stripe has not loaded yet.");
			setLoading(false);
			return;
		}
		try {
			// 1. Create a PaymentIntent by calling  backend
			const response = await fetch(
				`http://localhost:8000/payment/create-payment-intent/${userId}`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ amount: totalAmount }),
				}
			);
			const { clientSecret, error } = await response.json();
			if (error) {
				throw new Error(error);
			}
			const result = await stripe.confirmCardPayment(clientSecret, {
				payment_method: { card: elements.getElement(CardElement) },
			});

			if (result.error) {
				throw new Error(result.error.message);
			}

			if (result.paymentIntent.status === "succeeded") {
				setMessage("Payment successful!");
			} else {
				setMessage("Payment processing...");
			}
		} catch (error) {
			setMessage(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl">
			<h2 className="text-xl font-semibold mb-4">
				Complete Your Payment
			</h2>
			<p className="mb-4 text-gray-600">
				Total: <span className="font-bold">${totalAmount}</span>
			</p>

			<div className="mb-4">
				<label
					className="block text-gray-700 text-sm font-bold mb-2"
					htmlFor="paymentMethod">
					Payment Method
				</label>
				<select
					id="paymentMethod"
					name="paymentMethod"
					value={paymentMethod}
					onChange={(e) => setPaymentMethod(e.target.value)}
					className="block w-full p-3 border border-gray-300 rounded mt-1">
					<option value="card">Card</option>
					<option value="cod">Cash On Delivery</option>
				</select>

				{paymentMethod === "card" && (
					<div className="p-4 border rounded mb-4">
						<CardElement className="p-2 border rounded" />
					</div>
				)}

				<button
					className="w-full bg-blue-600 text-white py-2 rounded"
					onClick={handleSubmit}
					disabled={loading || !stripe}>
					{loading ? "Processing..." : "Pay Now"}
				</button>

				{message && <p className="mt-4 text-red-500">{message}</p>}
			</div>
		</div>
	);
}

export default PaymentForm;
