/* import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
	const { cart, total, clearCart } = useCart();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		address: "",
		city: "",
		zipCode: "",
		deliveryInstructions: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// 1. Validate the form
		// 2. Send order to backend
		// 3. Process payment
		// 4. Show confirmation

		try {
			// Simulating order submission
			console.log("Order submitted:", {
				orderDetails: formData,
				items: cart,
				total,
			});

			// Clear cart and redirect to success page
			clearCart();
			alert("Order placed successfully!");
			navigate("/");
		} catch (error) {
			console.error("Error placing order:", error);
			alert("There was an error placing your order. Please try again.");
		}
	};

	if (!cart || cart.length === 0) {
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

	return (
		<div className="max-w-6xl mx-auto p-4">
			<h2 className="text-2xl font-bold mb-6">Checkout</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{/* Delivery Details Form 
				<div className="bg-white p-6 rounded-lg shadow-md">
					<h3 className="text-xl font-semibold mb-4">
						Delivery Details
					</h3>
					<form
						onSubmit={handleSubmit}
						className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700">
									First Name
								</label>
								<input
									type="text"
									name="firstName"
									value={formData.firstName}
									onChange={handleInputChange}
									required
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Last Name
								</label>
								<input
									type="text"
									name="lastName"
									value={formData.lastName}
									onChange={handleInputChange}
									required
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
								/>
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">
								Email
							</label>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleInputChange}
								required
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">
								Phone
							</label>
							<input
								type="tel"
								name="phone"
								value={formData.phone}
								onChange={handleInputChange}
								required
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">
								Delivery Address
							</label>
							<input
								type="text"
								name="address"
								value={formData.address}
								onChange={handleInputChange}
								required
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
							/>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700">
									City
								</label>
								<input
									type="text"
									name="city"
									value={formData.city}
									onChange={handleInputChange}
									required
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">
									ZIP Code
								</label>
								<input
									type="text"
									name="zipCode"
									value={formData.zipCode}
									onChange={handleInputChange}
									required
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
								/>
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">
								Delivery Instructions (Optional)
							</label>
							<textarea
								name="deliveryInstructions"
								value={formData.deliveryInstructions}
								onChange={handleInputChange}
								rows="3"
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
							/>
						</div>

						<button
							type="submit"
							className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition-colors">
							Place Order (${cart.total.toFixed(2)})
						</button>
					</form>
				</div>

				{/* Order Summary 
				<div className="bg-white p-6 rounded-lg shadow-md h-fit">
					<h3 className="text-xl font-semibold mb-4">
						Order Summary
					</h3>
					<div className="space-y-4">
						{cart.items.map((item, index) => (
							<div
								key={index}
								className="flex justify-between items-center border-b pb-2">
								<div>
									<p className="font-medium">
										{item.menuItem.name}
									</p>
									<p className="text-sm text-gray-600">
										Quantity: {item.quantity}
									</p>
								</div>
								<p className="font-medium">
									$
									{(
										item.menuItem.price * item.quantity
									).toFixed(2)}
								</p>
							</div>
						))}
						<div className="border-t pt-4">
							<div className="flex justify-between items-center font-bold">
								<span>Total:</span>
								<span>${cart.total.toFixed(2)}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Checkout;
 */