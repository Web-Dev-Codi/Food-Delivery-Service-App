import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import PaymentForm from "./PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
	"pk_test_51QpRWNGOBWdkGRw0ZvcDq67gGtXySdQUxNZif5af8M7v1H12kAujDscDWXd4vcExcQXYNy5iSYreTU1CCZCpbCTU00AFm9G6td"
);

function Checkout() {
	const { state } = useContext(CartContext);
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
				items: state.cart,
				total: state.cart?.finalAmount,
			});

			// Clear cart and redirect to success page
			// clearCart();
			alert("Order placed successfully!");
			navigate("/");
		} catch (error) {
			console.error("Error placing order:", error);
			alert("There was an error placing your order. Please try again.");
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

	return (
		<div className="flex justify-center items-center m-16  h-full ">
			<div className="w-1/2 p-4">
				<h2 className="text-2xl text-center font-bold mb-6">
					Checkout
				</h2>

				<div className="">
					<div className="bg-neutral-900 p-6  rounded-lg shadow-md">
						<h3 className="text-xl font-semibold mb-4">
							Delivery Details
						</h3>
						<form
							onSubmit={handleSubmit}
							className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-white">
										First Name
									</label>
									<input
										type="text"
										name="firstName"
										value={formData.firstName}
										onChange={handleInputChange}
										required
										className="mt-1 block bg-white p-2 text-black w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-white">
										Last Name
									</label>
									<input
										type="text"
										name="lastName"
										value={formData.lastName}
										onChange={handleInputChange}
										required
										className="mt-1 block bg-white p-2 text-black w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
									/>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-white">
									Email
								</label>
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleInputChange}
									required
									className="mt-1 block bg-white p-2 text-black w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-white">
									Phone
								</label>
								<input
									type="tel"
									name="phone"
									value={formData.phone}
									onChange={handleInputChange}
									required
									className="mt-1 block bg-white p-2 text-black w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-white">
									Delivery Address
								</label>
								<input
									type="text"
									name="address"
									value={formData.address}
									onChange={handleInputChange}
									required
									className="mt-1 block bg-white p-2 text-black w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
								/>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-white">
										City
									</label>
									<input
										type="text"
										name="city"
										value={formData.city}
										onChange={handleInputChange}
										required
										className="mt-1 block bg-white p-2 text-black w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-white">
										ZIP Code
									</label>
									<input
										type="text"
										name="zipCode"
										value={formData.zipCode}
										onChange={handleInputChange}
										required
										className="mt-1 block bg-white p-2 text-black w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
									/>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-white">
									Delivery Instructions (Optional)
								</label>
								<textarea
									name="deliveryInstructions"
									value={formData.deliveryInstructions}
									onChange={handleInputChange}
									rows="3"
									className="mt-1 block bg-white p-2 text-black w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
								/>
							</div>

							<div className=" p-6 rounded-lg shadow-md h-fit">
								<h3 className="text-xl font-semibold mb-4">
									Order Summary
								</h3>
								<div className="space-y-4">
									{state.cart?.items?.map((item, index) => (
										<div
											key={index}
											className="flex justify-between items-center border-b pb-2">
											<div>
												<p className="font-medium">
													{item.foodItemId?.name}
												</p>
												<p className="text-sm text-gray-600">
													Quantity: {item.quantity}
												</p>
											</div>
											<p className="font-medium">
												$
												{(
													item.foodItemId?.price *
													item.quantity
												).toFixed(2)}
											</p>
										</div>
									))}
									<div className=" pt-4">
										<div className="flex justify-between items-center font-bold">
											<span>Total:</span>
											<span>
												$
												{state.cart?.finalAmount.toFixed(
													2
												)}
											</span>
										</div>
									</div>
								</div>
							</div>

							<Elements stripe={stripePromise}>
								<PaymentForm />
							</Elements>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Checkout;
