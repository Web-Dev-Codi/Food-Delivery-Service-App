import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { MapPin, Clock, CreditCard, Plus } from "lucide-react";

const CheckoutPage = () => {
	const { state, applyCoupon } = useContext(CartContext);
	const navigate = useNavigate();
	const [couponCode, setCouponCode] = useState("");
	const [discountMessage, setDiscountMessage] = useState("");
	const [tip, setTip] = useState(15);
	const [selectedPayment, setSelectedPayment] = useState("saved");
	const [formData, setFormData] = useState({
		deliveryInstructions: "",
	});

	const subtotal = state.cart.items.reduce(
		(acc, item) => acc + item.foodItemId.price * item.quantity,
		0
	);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleApplyCoupon = async () => {
		if (!couponCode.trim()) {
			setDiscountMessage("⚠️ Please enter a valid coupon code.");
			return;
		}

		try {
			await applyCoupon(couponCode);
			setDiscountMessage("🎉 Coupon applied successfully!");
		} catch (error) {
			console.error("Coupon application failed:", error);
			setDiscountMessage(error, "❌ Invalid or expired coupon.");
		}
	};

	if (!state.cart || state.cart.length === 0) {
		return (
			<div className="max-w-4xl mx-auto p-4 text-center">
				<h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
				<button
					onClick={() => navigate("/menu")}
					className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600">
					Browse Menu
				</button>
			</div>
		);
	}

	const deliveryFee = 4.99;
	const tax = subtotal * 0.08;
	const tipAmount = (subtotal * tip) / 100;
	const total = subtotal + deliveryFee + tax + tipAmount;

	return (
		<div className="bg-black/40 backdrop-blur-lg rounded-xl shadow-lg p-6 sm:px-6 lg:px-8 max-w-4xl mx-auto h-fit w-full">
			<h1 className="text-2xl font-bold mb-8">Checkout</h1>

			{/* Order Summary Section */}
			<div className=" rounded-lg p-6 mb-6">
				<h2 className="text-xl font-semibold mb-4">Order Summary</h2>
				<div className="space-y-4">
					{state.cart?.items?.map((item, index) => (
						<div
							key={index}
							className="flex justify-between items-center">
							<div className="flex items-center">
								<span className="font-medium">
									{item.quantity}x
								</span>
								<span className="ml-2">
									{item.foodItemId?.name}
								</span>
							</div>
							<span>
								$
								{(
									item.foodItemId?.price * item.quantity
								).toFixed(2)}
							</span>
						</div>
					))}
				</div>

				<div className="mt-6 pt-4 border-t border-gray-200">
					<div className="flex justify-between mb-2">
						<span>Subtotal</span>
						<span>${subtotal.toFixed(2)}</span>
					</div>
					<div className="flex justify-between mb-2">
						<span>Delivery Fee</span>
						<span>${deliveryFee.toFixed(2)}</span>
					</div>
					<div className="flex justify-between mb-2">
						<span>Tax</span>
						<span>${tax.toFixed(2)}</span>
					</div>
					<div className="flex justify-between mb-2">
						<span>Tip</span>
						<span>${tipAmount.toFixed(2)}</span>
					</div>
					<div className="flex justify-between font-bold mt-4 pt-4 border-t border-gray-200">
						<span>Total</span>
						<span>${total.toFixed(2)}</span>
					</div>
				</div>
			</div>

			{/* Delivery Information */}
			<div className="mb-8">
				<h2 className="text-xl font-semibold mb-4">
					Delivery Information
				</h2>
				<div className="border rounded-lg p-4">
					<div className="flex items-start mb-4">
						<MapPin className="w-5 h-5 mr-2 mt-1" />
						<div>
							<p className="font-medium">Delivery Address</p>
							<p className="text-gray-600">123 Main St, Apt 4B</p>
							<p className="text-gray-600">New York, NY 10001</p>
						</div>
					</div>
					<div className="flex items-center mb-4">
						<Clock className="w-5 h-5 mr-2" />
						<div>
							<p className="font-medium">
								Estimated Delivery Time
							</p>
							<p className="text-gray-600">30-45 minutes</p>
						</div>
					</div>
					<textarea
						className="w-full p-3 border rounded-lg"
						placeholder="Add delivery instructions (optional)"
						name="deliveryInstructions"
						value={formData.deliveryInstructions}
						onChange={handleInputChange}
						rows="2"
					/>
				</div>
			</div>

			{/* Payment Section */}
			<div className="mb-8">
				<h2 className="text-xl font-semibold mb-4">Payment Method</h2>
				<div className="border rounded-lg p-4">
					<div className="flex items-center mb-4">
						<input
							type="radio"
							name="payment"
							value="saved"
							checked={selectedPayment === "saved"}
							onChange={(e) => setSelectedPayment(e.target.value)}
							className="mr-2"
						/>
						<CreditCard className="w-5 h-5 mr-2" />
						<span>•••• •••• •••• 4242</span>
					</div>
					<button className="flex items-center text-[#FF5733]">
						<Plus className="w-4 h-4 mr-1" />
						Add new payment method
					</button>
				</div>

				{/* Tip Selection */}
				<div className="mt-6">
					<p className="font-medium mb-3">Add a tip</p>
					<div className="flex gap-3">
						{[10, 15, 20, 25].map((percentage) => (
							<button
								key={percentage}
								onClick={() => setTip(percentage)}
								className={`flex-1 py-2 rounded ${
									tip === percentage
										? "bg-[#FF5733] text-white"
										: "bg-gray-100 text-gray-700"
								}`}>
								{percentage}%
							</button>
						))}
					</div>
				</div>

				{/* Promo Code */}
				<div className="mt-6">
					<div className="flex justify-end gap-2">
						<input
							type="text"
							placeholder="Enter Coupon Code"
							value={couponCode}
							onChange={(e) => setCouponCode(e.target.value)}
							className="flex-1 p-2 border rounded"
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
									: "bg-[#FF5733] hover:bg-[#E53935]"
							}`}>
							Apply
						</button>
					</div>
				</div>
			</div>

			{/* Place Order Button */}
			<div className="mt-8">
				<button className="w-full py-4 bg-[#FF5733] text-white rounded-lg font-semibold hover:bg-[#E53935] transition-colors">
					Place Order - ${total.toFixed(2)}
				</button>
				<p className="text-center text-gray-500 mt-4 text-sm">
					By placing your order, you agree to our Terms of Service and
					Privacy Policy
				</p>
			</div>
		</div>
	);
};

export default CheckoutPage;
