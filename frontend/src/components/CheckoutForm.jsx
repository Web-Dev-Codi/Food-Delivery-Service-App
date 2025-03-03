import { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const CheckoutForm = ({ setSuccessPayment, loading, setLoading }) => {
	console.log("CheckoutForm props:", {
		setSuccessPayment,
		loading,
		setLoading,
	});

	if (typeof setLoading !== "function") {
		console.error(
			"❌ setLoading is not a function! Check how it is passed."
		);
	}

	const stripe = useStripe();
	const elements = useElements();
	// const navigate = useNavigate();
	const [userId, setUserId] = useState(null);

	// ✅ Check if Stripe is loaded
	useEffect(() => {
		console.log("Stripe Object:", stripe);
		console.log("Elements Object:", elements);

		if (!stripe || !elements) {
			console.warn("⚠️ Stripe is still loading...");
		} else {
			console.log("✅ Stripe and Elements are ready!");
		}
	}, [stripe, elements]);

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
		return <p>Loading user data...</p>;
	}

	const handlePayment = async (e) => {
		e.preventDefault();
		console.log("Payment initiated, loading:", loading);

		setLoading(true);
		console.log("loading set to true");

		try {
			// ✅ Step 1: Create PaymentIntent
			const response = await fetch(
				"http://localhost:8000/payment/create-payment-intent",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
					body: JSON.stringify({ userId }),
				}
			);

			if (!response.ok)
				throw new Error("Failed to create payment intent.");
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

			if (result.error) throw new Error(result.error.message);

			if (result.paymentIntent.status === "succeeded") {
				console.log("Stripe Payment Result:", result);
				toast.success("✅ Payment Successful!");
				setSuccessPayment(true);
			} else {
				toast.info("⏳ Payment processing...");
			}
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	console.log("Rendering CheckoutForm...");
	return (
		<form
			onSubmit={handlePayment}
			className="space-y-4">
			<CardElement
				options={{
					style: {
						base: {
							color: "white",
							fontSize: "16px",
							"::placeholder": { color: "#bbbbbb" },
						},
						invalid: { color: "#ff4d4d" },
					},
				}}
				className="p-3 border rounded-lg text-white"
			/>
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

CheckoutForm.propTypes = {
	setSuccessPayment: PropTypes.func,
	loading: PropTypes.bool,
	setLoading: PropTypes.func,
};
