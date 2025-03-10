import { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

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
			const { data } = await axios.post(
				`${API_URL}/payment/create-payment-intent`,
				{ userId },
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
					withCredentials: true, // Ensures credentials are sent if needed
				}
			);

			const { clientSecret, error } = data;
			if (error) throw new Error(error);

			// ✅ Step 2: Confirm Card Payment

			const cardElement = elements.getElement(CardElement);

			if (!stripe || !elements || !cardElement) {
				toast.error("❌ Please enter your card details.");
				setLoading(false);
				return;
			}

			const result = await stripe.confirmCardPayment(clientSecret, {
				payment_method: { card: cardElement },
			});

			if (result.error) throw new Error(result.error.message);

			if (result.paymentIntent.status === "succeeded") {
				console.log("✅ Stripe Payment Result:", result);
				toast.success("✅ Payment Successful!");
				setSuccessPayment(true);
			} else {
				toast.info("⏳ Payment processing...");
			}
		} catch (error) {
			toast.error(error.response?.data?.message || error.message);
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
