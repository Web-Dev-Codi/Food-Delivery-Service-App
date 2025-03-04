/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
	Clock,
	MapPin,
	CreditCard,
	Check,
	ArrowLeft,
	ShoppingCart,
} from "lucide-react";
import { toast, Bounce } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import CartItems from "../CartItems";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./CheckPayment";
import axios from "axios";

const stripePromise = loadStripe(
	"pk_test_51QpRWNGOBWdkGRw0ZvcDq67gGtXySdQUxNZif5af8M7v1H12kAujDscDWXd4vcExcQXYNy5iSYreTU1CCZCpbCTU00AFm9G6td"
);

const CartCheckoutFlow = () => {
	const {
		state,
		fetchCart,
		updateCartItem,
		removeCartItem,
		applyCoupon,
		clearCart,
	} = useContext(CartContext);
	const navigate = useNavigate();
	const [couponCode, setCouponCode] = useState("");

	const [step, setStep] = useState(1);
	const [tip, setTip] = useState(15);

	const [loading, setLoading] = useState(false);
	const [addresses, setAddresses] = useState([]);
	const [selectedAddress, setSelectedAddress] = useState("");

	useEffect(() => {
		const fetchAddresses = async () => {
			try {
				const token = localStorage.getItem("token");
				if (!token) {
					toast.error("User not authenticated", {
						position: "bottom-right",
					});
					return;
				}

				const response = await axios.get(
					"http://localhost:8000/data/userAddress",
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);

				if (response.data.data.address) {
					// Since address is an object
					setAddresses([response.data.data.address]); // Store it as an array for consistency
					setSelectedAddress(response.data.data.address); // Directly set it
				} else {
					toast.error("No address found", {
						position: "bottom-right",
					});
				}
			} catch (error) {
				toast.error(
					error.response?.data?.message || "Failed to fetch address",
					{ position: "bottom-right", autoClose: 3000 }
				);
			} finally {
				setLoading(false);
			}
		};

		fetchAddresses();
	}, []);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			fetchCart(); // Fetch cart only if token exists
		} else {
			navigate("/login"); // Redirect to login if no token
		}
	}, []); // Only fetch on mount

	if (state.error) {
		return <div className="text-red-500">Error: {state.error}</div>;
	}

	// Check if cart is empty
	if (!state.cart?.items || state.cart.items.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center p-8 h-screen m-8 bg-black/40 backdrop-blur-lg rounded-lg shadow-sm">
				<div className="text-2xl font-semibold mb-4">
					Your cart is empty
				</div>
				<p className="text-gray-400 mb-6">
					Add some delicious items to your cart to get started!
				</p>
				<button
					onClick={() => navigate("/restaurants")}
					className="bg-[#F97316] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#EA580C] transition-colors">
					Browse Restaurants
				</button>
			</div>
		);
	}

	const handleQuantityChange = (foodItemId, quantity) => {
		const quantityInt = parseInt(quantity, 10);
		if (quantityInt > 0) {
			updateCartItem(foodItemId, quantityInt);
		}
	};

	const handleRemoveClick = (foodItemId) => {
		console.log("Removing item:", foodItemId);
		removeCartItem(foodItemId);
	};

	// In your click handler:
	const handleClearCart = async () => {
		try {
			await clearCart();
			toast.warning("Cart cleared successfully", {
				position: "bottom-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: false,
				draggable: false,
				transition: Bounce,
				theme: "dark",
				icon: <ShoppingCart />,
			});
		} catch (error) {
			console.error("Error clearing cart:", error);
		}
	};

	const handleApplyCoupon = async () => {
		console.log("applyCoupon function:", applyCoupon);

		if (!couponCode.trim()) {
			toast.warn("⚠️ Please enter a valid coupon code.");
			return;
		}

		try {
			const response = await applyCoupon(couponCode.trim());
			console.log("handleApplyCoupon response:", response);

			if (response?.message === "Coupon applied successfully!") {
				toast.success(`🎉 Coupon applied! Discount: €${response.discount}`);
			} else {
				toast.error(`❌ ${response.message || "Invalid or expired coupon."}`);
			}
		} catch (error) {
			console.error("handleApplyCoupon error:", error);
			toast.error(error.message || "❌ Invalid or expired coupon.");
		}
	};

	const subtotal = state.cart?.totalAmount || 0;
	/*  const deliveryFee = state.cart?.deliveryFee || 2.99;
  const tax = state.cart?.tax || 0;
  const serviceFee = state.cart?.serviceFee || 1.99;
  const tipAmount = (subtotal * tip) / 100;
  const totalFee = deliveryFee + tax + serviceFee + tipAmount; */
	const total = subtotal || 0;

	const renderMobileStepIndicator = () => (
		<div className="flex md:hidden items-center justify-center mb-6">
			<div className="flex space-x-2">
				{[1, 2, 3, 4].map((num) => (
					<div
						key={num}
						className={`w-2 h-2 rounded-full ${
							step === num ? "bg-[#F97316]" : "bg-gray-300"
						}`}
					/>
				))}
			</div>
		</div>
	);

	const renderDesktopStepIndicator = () => (
		<div className="hidden md:flex justify-between mb-8 max-w-4xl mx-auto">
			{["Cart", "Delivery", "Payment", "Review"].map((text, index) => (
				<div
					key={text}
					className="flex items-center">
					<div
						className={`flex items-center justify-center w-8 h-8 rounded-full ${
							step > index + 1
								? "bg-green-500 text-white"
								: step === index + 1
								? "bg-[#F97316] text-white"
								: "bg-gray-200 text-gray-600"
						}`}>
						{step > index + 1 ? (
							<Check className="w-5 h-5" />
						) : (
							index + 1
						)}
					</div>
					<span
						className={`ml-2 ${
							step === index + 1
								? "text-[#F97316] font-medium"
								: "text-gray-600"
						}`}>
						{text}
					</span>
					{index < 3 && (
						<div className="w-12 h-1 mx-2 bg-gray-200">
							<div
								className={`h-full ${
									step > index + 1
										? "bg-green-500"
										: "bg-gray-200"
								}`}
							/>
						</div>
					)}
				</div>
			))}
		</div>
	);

	const renderMobileHeader = () => (
		<div className="md:hidden flex items-center justify-between mb-4">
			<button
				onClick={() => step > 1 && setStep(step - 1)}
				className="p-2">
				<ArrowLeft className="w-6 h-6" />
			</button>
			<h1 className="text-lg font-semibold">
				{step === 1
					? "Your Cart"
					: step === 2
					? "Delivery Details"
					: step === 3
					? "Payment"
					: "Review Order"}
			</h1>
			<div className="w-6" />
		</div>
	);

	const renderCartView = () => (
		<div className="space-y-6">
			<div className="bg-black/40 backdrop-blur-lg  rounded-lg shadow-sm p-4 md:p-6">
				<div className="hidden md:flex items-center justify-between mb-4">
					<h2 className="text-xl font-semibold">Your Cart</h2>
					<button
						onClick={handleClearCart}
						className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
						Clear Cart
					</button>
				</div>

				<ul className="space-y-4">
					{state.cart?.items?.map((item) => (
						<CartItems
							key={item.foodItemId?._id}
							item={item}
							onQuantityChange={handleQuantityChange}
							onRemoveClick={handleRemoveClick}
							isProcessed={
								state.cart?.status?.toLowerCase() ===
								"processed"
							}
						/>
					))}
				</ul>

				<div className="mt-6 space-y-2 text-sm md:text-base">
					<div className="flex justify-between">
						<span>Total</span>
						<span>${subtotal.toFixed(2)}</span>
					</div>
				</div>
			</div>

			<button
				onClick={() => setStep(2)}
				className="hidden md:block w-full bg-[#F97316] text-white py-3 md:py-4 rounded-lg font-medium">
				Proceed to Delivery
			</button>
		</div>
	);

	const renderDeliveryView = () => (
		<div className="space-y-6">
			<div className="bg-black/40 backdrop-blur-lg rounded-lg shadow-sm p-4 md:p-6">
				<h2 className="text-xl font-semibold mb-4">Delivery Details</h2>
				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium mb-2">
							Delivery Address
						</label>
						<select
							className="w-full p-3 border rounded-lg"
							value={
								selectedAddress
									? addresses.indexOf(selectedAddress)
									: ""
							}
							onChange={(e) =>
								setSelectedAddress(addresses[e.target.value])
							} // Get object by index
						>
							{addresses.length > 0 ? (
								addresses.map((address, index) => (
									<option
										key={index}
										value={index}>
										{address.street}, {address.city},{" "}
										{address.state} - {address.zipCode}
									</option>
								))
							) : (
								<option value="">No Address Available</option>
							)}
						</select>
					</div>

					<div>
						<label className="block text-sm font-medium mb-2">
							Delivery Time
						</label>
						<select className="w-full p-3 border rounded-lg">
							<option>As soon as possible (35-45 min)</option>
							<option>Schedule for later</option>
						</select>
					</div>

					<div>
						<label className="block text-sm font-medium mb-2">
							Delivery Instructions
						</label>
						<textarea
							className="w-full p-3 border rounded-lg"
							placeholder="Add any special delivery instructions..."
							rows="3"
						/>
					</div>

					<div className="flex items-center">
						<input
							type="checkbox"
							id="contactless"
							className="mr-2"
						/>
						<label htmlFor="contactless">
							Contactless delivery
						</label>
					</div>
				</div>
			</div>

			<div className="hidden md:flex space-x-4">
				<button
					onClick={() => setStep(1)}
					className="flex-1 bg-transparent border border-[#F97316] text-[#F97316] py-3 rounded-lg font-medium">
					Back
				</button>
				<button
					onClick={() => setStep(3)}
					className="flex-1 bg-[#F97316] text-white py-3 rounded-lg font-medium">
					Review Order
				</button>
			</div>
		</div> // ✅ This ensures the return function has a single root element.
	);

	const renderPaymentView = () => (
		<div className="space-y-6">
			{console.log("Rendering Payment View, loading:", loading)}

			{/* ✅ Promo Code Section */}
			<div className="mt-6">
				<label className="block text-sm font-medium mb-2">
					Promo Code
				</label>
				<div className="flex space-x-2">
					<input
						type="text"
						placeholder="Enter coupon code"
						className="flex-1 p-3 border rounded-lg"
						value={couponCode}
						onChange={(e) => setCouponCode(e.target.value)} // ✅ Moved function outside
					/>
					<button
						onClick={handleApplyCoupon}
						disabled={
							state.cart?.appliedCoupon ||
							state.user?.usedCoupons?.includes(couponCode)
						}
						className={`px-4 py-2 rounded-md ${
							state.cart?.appliedCoupon
								? "bg-gray-400 cursor-not-allowed"
								: "bg-[#F97316] hover:bg-[#eb7622] hover:cursor-pointer hover:text-black"
						}`}>
						Apply Coupon
					</button>
				</div>
			</div>

			{/* ✅ Payment Method Section */}
			<div className="bg-black/40 backdrop-blur-lg rounded-lg shadow-sm p-4 md:p-6">
				<h2 className="text-xl font-semibold mb-4">Payment Method</h2>

				{/* ✅ Add Checkout Component Here */}
				<Checkout />
			</div>

			{/* ✅ Navigation Buttons */}
			<div className="hidden md:flex space-x-4">
				<button
					onClick={() => setStep(2)}
					className="flex-1 bg-transparent border border-[#F97316] text-[#F97316] py-3 rounded-lg font-medium">
					Back
				</button>
				<button
					onClick={() => {
						setLoading(true);
						navigate("/invoice");
					}}
					className={`flex-1 py-3 rounded-lg font-medium ${
						loading
							? "bg-gray-400 cursor-not-allowed"
							: "bg-[#F97316] text-white hover:bg-[#eb7622]"
					}`}>
					{loading ? "Processing..." : " Dispaly Invoice "}
				</button>
			</div>
		</div>
	);

	const renderReviewView = () => (
		<div className="space-y-6">
			<div className="bg-black/40 backdrop-blur-lg rounded-lg shadow-sm p-4 md:p-6">
				<h2 className="text-xl font-semibold mb-4">Review Order</h2>

				<div className="space-y-4">
					<div className="flex items-start justify-between pb-4 border-b">
						<div className="flex items-start">
							<MapPin className="w-5 h-5 text-gray-400 mt-1" />
							<div className="ml-3">
								<p className="font-medium">Delivery Address</p>
								{selectedAddress ? (
									<>
										<p className="text-sm text-gray-600">
											{selectedAddress.street},{" "}
											{selectedAddress.city}
										</p>
										<p className="text-sm text-gray-600">
											{selectedAddress.state} -{" "}
											{selectedAddress.zipCode}
										</p>
									</>
								) : (
									<p className="text-sm text-gray-600">
										No Address Selected
									</p>
								)}
							</div>
						</div>
						<button className="text-[#F97316] text-sm">Edit</button>
					</div>

					<div className="flex items-start justify-between pb-4 border-b">
						<div className="flex items-start">
							<Clock className="w-5 h-5 text-gray-400 mt-1" />
							<div className="ml-3">
								<p className="font-medium">Delivery Time</p>
								<p className="text-sm text-gray-600">
									As soon as possible (35-45 min)
								</p>
							</div>
						</div>
						<button className="text-[#F97316] text-sm">Edit</button>
					</div>

					<div className="space-y-2 text-sm">
						<div className="flex justify-between">
							<span>Total</span>
							<span>${subtotal.toFixed(2)}</span>
						</div>
					</div>
				</div>
			</div>

			<div className="hidden md:flex space-x-4">
				<button
					onClick={() => setStep(3)}
					className="flex-1 bg-transparent border border-[#F97316] text-[#F97316] py-3 rounded-lg font-medium">
					Back
				</button>
				<button
					className="flex-1 bg-[#F97316] text-white py-3 rounded-lg font-medium"
					onClick={() => setStep(4)}>
					Continue to Payment
				</button>
			</div>
		</div>
	);

	return (
		<div className="min-h-screen pb-20 md:pb-0">
			<div className="max-w-6xl mx-auto px-4 md:px-6 py-4 md:py-8">
				{renderMobileHeader()}
				{renderMobileStepIndicator()}
				{renderDesktopStepIndicator()}

				<div className="max-w-4xl mx-auto">
					{step === 1 && renderCartView()}
					{step === 2 && renderDeliveryView()}
					{step === 3 && renderReviewView()}
					{step === 4 && renderPaymentView()}
				</div>

				{/* Mobile Bottom Navigation */}
				<div className="fixed bottom-0 left-0 right-0 md:hidden bg-black/40 backdrop-blur-lg border-t border-[#D84418]/40">
					<div className="flex justify-between items-center p-4 max-w-4xl mx-auto">
						<div>
							<p className="text-sm text-gray-300">Total</p>
							<p className="font-semibold text-white">
								${total.toFixed(2)}
							</p>
						</div>
						<button
							onClick={() =>
								step < 4 ? setStep(step + 1) : null
							}
							className="bg-[#F97316] text-white px-6 py-2 rounded-lg hover:bg-[#eb7622] transition-colors">
							{step === 4 ? "Place Order" : "Continue"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartCheckoutFlow;
