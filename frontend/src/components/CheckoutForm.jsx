import { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";


const CheckoutForm = ({ setStep, setSuccessPayment }) => {
	const stripe = useStripe();
	const elements = useElements();
	const [loading, setLoading] = useState(false);
	const [userId, setUserId] = useState(null);

	// ✅ Get user ID from JWT token
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			const decoded = jwtDecode(token);
			setUserId(decoded.userId);
		} else {
			console.error("No token found in localStorage");
		}
	}, []);

	if (!userId) {
		return <p>Error: User ID is missing!</p>;
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		if (!stripe || !elements) {
			toast.error("Stripe is not loaded yet.");
			setLoading(false);
			return;
		}

		try {
			// ✅ Step 1: Create PaymentIntent from backend
			const response = await fetch("http://localhost:8000/payment/create-payment-intent", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				body: JSON.stringify({ userId }),
			});

			if (!response.ok) throw new Error("Failed to create payment intent.");

			const { clientSecret, error } = await response.json();
			if (error) throw new Error(error);

			// ✅ Step 2: Confirm Card Payment
			const cardElement = elements.getElement(CardElement);
			if (!cardElement) {
				toast.error("Please enter your card details.");
				setLoading(false);
				return;
			}

			const result = await stripe.confirmCardPayment(clientSecret, {
				payment_method: { card: cardElement },
			});

			if (result.error) {
				throw new Error(result.error.message);
			}

			if (result.paymentIntent.status === "succeeded") {
				toast.success("✅ Payment Successful!");
				setSuccessPayment(true);
				setStep(4); // Move to Review Order step
			} else {
				toast.info("⏳ Payment processing...");
			}
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<CardElement className="p-3 border rounded-lg" />
			<button
				type="submit"
				disabled={!stripe || loading}
				className={`w-full py-3 rounded-lg font-medium ${
					loading
						? "bg-gray-400 cursor-not-allowed"
						: "bg-[#F97316] text-white hover:bg-[#eb7622]"
				}`}>
				{loading ? "Processing..." : "Confirm Payment"}
			</button>
		</form>
	);
};

export default CheckoutForm;
