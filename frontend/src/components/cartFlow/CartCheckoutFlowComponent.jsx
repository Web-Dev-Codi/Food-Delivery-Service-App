import { useState } from "react";
import {
	// ShoppingCart,
	Plus,
	Minus,
	Trash2,
	Edit,
	Clock,
	MapPin,
	CreditCard,
	Check,
	// ChevronRight,
	ArrowLeft,
} from "lucide-react";

const CartCheckoutFlow = () => {
	const [step, setStep] = useState(1);
	const [tip, setTip] = useState(15);

	const cartItems = [
		{
			id: 1,
			name: "Margherita Pizza",
			price: 14.99,
			quantity: 1,
			customization: "Extra cheese, No basil",
			image: "/api/placeholder/100/100",
		},
		{
			id: 2,
			name: "Caesar Salad",
			price: 8.99,
			quantity: 1,
			customization: "Dressing on the side",
			image: "/api/placeholder/100/100",
		},
	];

	const subtotal = cartItems.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);
	const deliveryFee = 2.99;
	const tax = subtotal * 0.08;
	const serviceFee = 1.99;
	const tipAmount = (subtotal * tip) / 100;
	const total = subtotal + deliveryFee + tax + serviceFee + tipAmount;

	const renderMobileStepIndicator = () => (
		<div className="flex md:hidden items-center justify-center mb-6">
			<div className="flex space-x-2">
				{[1, 2, 3, 4].map((num) => (
					<div
						key={num}
						className={`w-2 h-2 rounded-full ${
							step === num ? "bg-blue-600" : "bg-gray-300"
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
								? "bg-blue-600 text-white"
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
								? "text-blue-600 font-medium"
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
			<div className="bg-black/40 backdrop-blur-lg border border-[#D84418]/40 rounded-xl shadow-lg p-6 sm:px-6 lg:px-8">
				<div className="hidden md:flex items-center justify-between mb-4">
					<h2 className="text-xl font-semibold">Your Cart</h2>
					<button className="text-red-600 text-sm">Clear Cart</button>
				</div>

				{cartItems.map((item) => (
					<div
						key={item.id}
						className="flex items-start py-4 border-t">
						<img
							src={item.image}
							alt={item.name}
							className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg"
						/>
						<div className="flex-1 ml-4">
							<div className="flex justify-between">
								<h3 className="font-medium">{item.name}</h3>
								<p className="font-medium">
									${item.price.toFixed(2)}
								</p>
							</div>
							<p className="text-sm text-gray-600 mt-1">
								{item.customization}
							</p>
							<div className="flex items-center justify-between mt-2">
								<div className="flex items-center border rounded-lg">
									<button className="p-1 md:p-2">
										<Minus className="w-4 h-4" />
									</button>
									<span className="px-3">
										{item.quantity}
									</span>
									<button className="p-1 md:p-2">
										<Plus className="w-4 h-4" />
									</button>
								</div>
								<div className="flex space-x-2">
									<button className="text-blue-600">
										<Edit className="w-4 h-4" />
									</button>
									<button className="text-red-600">
										<Trash2 className="w-4 h-4" />
									</button>
								</div>
							</div>
						</div>
					</div>
				))}

				<div className="mt-6 space-y-2 text-sm md:text-base">
					<div className="flex justify-between">
						<span>Subtotal</span>
						<span>${subtotal.toFixed(2)}</span>
					</div>
					<div className="flex justify-between">
						<span>Delivery Fee</span>
						<span>${deliveryFee.toFixed(2)}</span>
					</div>
					<div className="flex justify-between pt-2 border-t">
						<span className="font-medium">Total</span>
						<span className="font-medium">${total.toFixed(2)}</span>
					</div>
				</div>
			</div>

			<button
				onClick={() => setStep(2)}
				className="w-full bg-blue-600 text-white py-3 md:py-4 rounded-lg font-medium">
				Proceed to Delivery
			</button>
		</div>
	);

	const renderDeliveryView = () => (
		<div className="space-y-6">
			<div className="bg-black/40 backdrop-blur-lg border border-[#D84418]/40 rounded-xl shadow-lg p-6 sm:px-6 lg:px-8">
				<h2 className="text-xl font-semibold mb-4">Delivery Details</h2>

				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium mb-2">
							Delivery Address
						</label>
						<select className="w-full p-3 border rounded-lg bg-white">
							<option>Home - 123 Main St, Apt 4B</option>
							<option>Work - 456 Office Ave</option>
							<option>Add New Address</option>
						</select>
					</div>

					<div>
						<label className="block text-sm font-medium mb-2">
							Delivery Time
						</label>
						<select className="w-full p-3 border rounded-lg bg-white">
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

			<div className="flex space-x-4">
				<button
					onClick={() => setStep(1)}
					className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium">
					Back
				</button>
				<button
					onClick={() => setStep(3)}
					className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium">
					Continue to Payment
				</button>
			</div>
		</div>
	);

	const renderPaymentView = () => (
		<div className="space-y-6">
			<div className="bg-black/40 backdrop-blur-lg border border-[#D84418]/40 rounded-xl shadow-lg p-6 sm:px-6 lg:px-8">
				<h2 className="text-xl font-semibold mb-4">Payment Method</h2>

				<div className="space-y-4">
					<div className="flex items-center p-3 border rounded-lg">
						<input
							type="radio"
							name="payment"
							id="card1"
							className="mr-3"
							defaultChecked={true}
						/>
						<label
							htmlFor="card1"
							className="flex-1">
							<span className="font-medium">
								•••• •••• •••• 4242
							</span>
							<br />
							<span className="text-sm text-gray-600">
								Expires 12/24
							</span>
						</label>
						<CreditCard className="w-6 h-6 text-gray-400" />
					</div>

					<button className="w-full text-left text-blue-600 font-medium">
						+ Add New Card
					</button>

					<div className="mt-6">
						<h3 className="font-medium mb-3">Tip</h3>
						<div className="grid grid-cols-4 gap-2">
							{[10, 15, 20, 25].map((percentage) => (
								<button
									key={percentage}
									onClick={() => setTip(percentage)}
									className={`py-2 rounded ${
										tip === percentage
											? "bg-blue-600 text-white"
											: "bg-gray-100 text-gray-700"
									}`}>
									{percentage}%
								</button>
							))}
						</div>
					</div>

					<div className="mt-6">
						<label className="block text-sm font-medium mb-2">
							Promo Code
						</label>
						<div className="flex space-x-2">
							<input
								type="text"
								placeholder="Enter code"
								className="flex-1 p-3 border rounded-lg"
							/>
							<button className="px-4 py-2 bg-gray-100 rounded-lg">
								Apply
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="flex space-x-4">
				<button
					onClick={() => setStep(2)}
					className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium">
					Back
				</button>
				<button
					onClick={() => setStep(4)}
					className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium">
					Review Order
				</button>
			</div>
		</div>
	);

	const renderReviewView = () => (
		<div className="space-y-6">
			<div className="bg-black/40 backdrop-blur-lg border border-[#D84418]/40 rounded-xl shadow-lg p-6 sm:px-6 lg:px-8">
				<h2 className="text-xl font-semibold mb-4">Review Order</h2>

				<div className="space-y-4">
					<div className="flex items-start justify-between pb-4 border-b">
						<div className="flex items-start">
							<MapPin className="w-5 h-5 text-gray-400 mt-1" />
							<div className="ml-3">
								<p className="font-medium">Delivery Address</p>
								<p className="text-sm text-gray-600">
									123 Main St, Apt 4B
								</p>
								<p className="text-sm text-gray-600">
									New York, NY 10001
								</p>
							</div>
						</div>
						<button className="text-blue-600 text-sm">Edit</button>
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
						<button className="text-blue-600 text-sm">Edit</button>
					</div>

					<div className="space-y-2 text-sm">
						<div className="flex justify-between">
							<span>Subtotal</span>
							<span>${subtotal.toFixed(2)}</span>
						</div>
						<div className="flex justify-between">
							<span>Delivery Fee</span>
							<span>${deliveryFee.toFixed(2)}</span>
						</div>
						<div className="flex justify-between">
							<span>Tax</span>
							<span>${tax.toFixed(2)}</span>
						</div>
						<div className="flex justify-between">
							<span>Service Fee</span>
							<span>${serviceFee.toFixed(2)}</span>
						</div>
						<div className="flex justify-between">
							<span>Tip ({tip}%)</span>
							<span>${tipAmount.toFixed(2)}</span>
						</div>
						<div className="flex justify-between pt-2 border-t font-medium">
							<span>Total</span>
							<span>${total.toFixed(2)}</span>
						</div>
					</div>
				</div>
			</div>

			<div className="flex space-x-4">
				<button
					onClick={() => setStep(3)}
					className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium">
					Back
				</button>
				<button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium">
					Place Order
				</button>
			</div>
		</div>
	);

	return (
		<div className="min-h-screen  bg-transparent">
			<div className="max-w-6xl mx-auto px-4 md:px-6 py-4 md:py-8">
				{renderMobileHeader()}
				{renderMobileStepIndicator()}
				{renderDesktopStepIndicator()}

				<div className="max-w-4xl mx-auto">
					{step === 1 && renderCartView()}
					{step === 2 && renderDeliveryView()}
					{step === 3 && renderPaymentView()}
					{step === 4 && renderReviewView()}
				</div>

				<div className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden">
					<div className="flex justify-between items-center p-4">
						<div>
							<p className="text-sm text-gray-600">Total</p>
							<p className="font-semibold">${total.toFixed(2)}</p>
						</div>
						<button
							onClick={() =>
								step < 4 ? setStep(step + 1) : null
							}
							className="bg-blue-600 text-white px-6 py-2 rounded-lg">
							{step === 4 ? "Place Order" : "Continue"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartCheckoutFlow;
