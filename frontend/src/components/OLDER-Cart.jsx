/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import CartItems from "./OLD-CartItems";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
	const { state, fetchCart, updateCartItem, removeCartItem, applyCoupon } =
		useContext(CartContext);
	const navigate = useNavigate();
	const [couponCode, setCouponCode] = useState("");
	const [discountMessage, setDiscountMessage] = useState("");

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			fetchCart(); // Fetch cart only if token exists
		} else {
			navigate("/login"); // Redirect to login if no token
		}
	}, []); // Only fetch on mount

	useEffect(() => {
		if (state.cart?.status?.toLowerCase() === "processed") {
			console.log("Cart is processed, redirecting to home page");
			navigate("/");
		}
	}, [state.cart?.status, navigate]);

	if (state.error) {
		return <div className="text-red-500">Error: {state.error}</div>;
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

	const handleApplyCoupon = async () => {
		if (!couponCode.trim()) {
			setDiscountMessage("⚠️ Please enter a valid coupon code.");
			return;
		}

		try {
			await applyCoupon(couponCode);
			setDiscountMessage("🎉 Coupon applied successfully!");
		} catch (error) {
			setDiscountMessage(
				`❌ ${
					error.response?.data?.message ||
					"Invalid or expired coupon."
				}`
			);
		}
	};

	if (!state.cart || !state.cart.items || state.cart.items.length === 0) {
		return (
			<div className="text-center p-4 h-screen">
				<h2 className="text-xl font-bold mb-4">Your Cart</h2>
				<p>Your cart is empty</p>
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto p-4 h-screen">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-bold">Your Cart</h2>
				<button
					// onClick={clearCart}
					className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
					Clear Cart
				</button>
			</div>

			{state.cart?.items?.length === 0 ? (
				<p className="text-lg text-gray-500">Your cart is empty</p>
			) : (
				<ul className="space-y-4">
					{state.cart?.items?.map((item) => (
						<CartItems
							key={item.foodItemId._id}
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
			)}

			{state.cart?.status?.toLowerCase() !== "processed" && (
				<div className="mt-6 flex items-center space-x-4">
					<input
						type="text"
						placeholder="Enter Coupon Code"
						value={couponCode}
						onChange={(e) => setCouponCode(e.target.value)}
						className="p-2 border border-gray-300 rounded-md w-1/3"
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
								: "bg-blue-500 hover:bg-blue-600"
						}`}>
						Apply Coupon
					</button>
				</div>
			)}

			{discountMessage && (
				<p className="mt-2 text-sm font-medium text-green-600">
					{discountMessage}
				</p>
			)}

			{state.cart?.items?.length > 0 && (
				<div className="border-t pt-4">
					<div className="flex justify-between items-center mb-4">
						<span className="text-xl font-semibold">Total:</span>
						<span className="text-2xl font-bold">
							${state.cart?.finalAmount?.toFixed(2)}
						</span>
					</div>
					<button
						onClick={() => navigate("/checkout")}
						className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition-colors">
						Proceed to Checkout
					</button>
				</div>
			)}

			{/* {state.cart?.items?.length > 0 &&
				state.cart?.status?.toLowerCase() !== "processed" && (
					<div className="mt-8 text-center">
						<button
							className="bg-blue-500 text-white px-6 py-2 rounded-full text-lg hover:bg-blue-600 transition duration-200"
							onClick={() => navigate("/payment")}>
							Proceed to Checkout
						</button>
						<button
							className="bg-red-500 text-white px-6 py-2 rounded-full text-lg hover:bg-red-600 transition duration-200 ml-4"
							onClick={() => navigate("/restaurants")}>
							Continue Ordering Food
						</button>
					</div>
				)} */}

			{state.cart?.status?.toLowerCase() === "processed" && (
				<div className="mt-6 text-center text-green-600 text-lg font-semibold">
					🎉 Your order has been placed! Redirecting to orders...
				</div>
			)}
		</div>
	);
};

export default Cart;
