/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

function Invoice() {
	const [cart, setCart] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [orderCreated, setOrderCreated] = useState(false);
	const invoiceRef = useRef();

	const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

	useEffect(() => {
		const fetchCart = async () => {
			try {
				const token = localStorage.getItem("token");
				const response = await axios.get(`${API_URL}/cart/getInvoice`, {
					headers: { Authorization: `Bearer ${token}` },
				});

				setCart(response.data.data);
				setLoading(false);
			} catch (err) {
				console.log(err);
				setLoading(false);
				setError("Something went wrong");
			}
		};
		fetchCart();
	}, []);

	useEffect(() => {
		const placeOrderOnMount = async () => {
			if (!cart || orderCreated) return;

			try {
				const token = localStorage.getItem("token");
				console.log("token from localstorage in save-order",token)
				const { _id: cartId } = cart;

				if (!cartId) {
					console.error("Cart not found");
					return;
				}

				const response = await axios.post(
					`${API_URL}/payment/save-order/${cartId}`,
					{}, // Empty body (if no data is sent)
					{
						headers: {
							Authorization: `Bearer ${token}`,
							"Content-Type": "application/json",
						},
					}
				);

				if (response.status === 201) {
					console.log("Order created:", response.data);
					setOrderCreated(true);
				} else {
					console.error("Failed to create order");
				}
			} catch (error) {
				console.error("Error creating order:", error.message);
			}
		};

		if (cart) {
			placeOrderOnMount();
		}
	}, [cart, orderCreated]);

	const generatePDF = () => {
		const input = invoiceRef.current;
		html2canvas(input, { scale: 2 }).then((canvas) => {
			const imgData = canvas.toDataURL("image/png");
			const pdf = new jsPDF("p", "mm", "a4");
			const imgWidth = 190;
			const imgHeight = (canvas.height * imgWidth) / canvas.width;

			pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
			pdf.save("invoice.pdf");
		});
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;
	if (!cart) return <p>No items in the cart</p>;

	return (
		<div className="flex flex-col items-center p-6">
			<h1 className="text-2xl font-bold mt-10 mb-10">
				Thank you for your order! 🚚 Your order will be delivered soon.
				Your invoice is ready—feel free to download it for your records.
				We look forward to serving you again!
			</h1>

			<div
				ref={invoiceRef}
				className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
				<div className="text-center mb-6">
					<h1 className="text-2xl text-black font-bold">
						Four Flavours Express
					</h1>
					<p className="text-gray-600">
						Hauptstraße 123, 10115 Berlin, Germany
					</p>
					<p className="text-gray-600">📞 +49 30 12345678</p>
				</div>

				<hr className="border-gray-300 my-4" />

				<h2 className="text-xl font-semibold text-center text-gray-800">
					Invoice
				</h2>

				<div className="overflow-x-auto mt-4">
					<table className="w-full border-collapse border border-gray-300">
						<thead className="bg-blue-600 text-white">
							<tr>
								<th className="border border-gray-300 px-4 py-2">
									Item
								</th>
								<th className="border border-gray-300 px-4 py-2">
									Price
								</th>
								<th className="border border-gray-300 px-4 py-2">
									Quantity
								</th>
								<th className="border border-gray-300 px-4 py-2">
									Subtotal
								</th>
							</tr>
						</thead>
						<tbody>
							{cart.items.map((item, index) => (
								<tr
									key={index}
									className="text-center border border-gray-300">
									<td className="border border-gray-300 px-4 py-2 text-black">
										{item.foodItemId.name}
									</td>
									<td className="border border-gray-300 px-4 py-2 text-black">
										${item.foodItemId.price}
									</td>
									<td className="border border-gray-300 px-4 py-2 text-black">
										{item.quantity}
									</td>
									<td className="border border-gray-300 px-4 py-2 text-black">
										${item.subtotal}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<hr className="border-gray-300 my-4" />

				<div className="flex justify-between items-center text-lg font-semibold text-gray-800">
					<p>Total Amount:</p>
					<p>${cart.totalAmount}</p>
				</div>

				{cart.discount > 0 && (
					<div className="flex justify-between items-center text-lg font-semibold text-gray-800">
						<p>Discount:</p>
						<p>-${cart.discount}</p> {/* Show discount amount */}
					</div>
				)}
				<div className="flex justify-between items-center text-lg font-semibold text-gray-800">
					<p>Final Amount:</p>
					<p>${cart.finalAmount}</p>
				</div>
			</div>

			{true && (
				<button
					onClick={generatePDF}
					className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
					Download Invoice
				</button>
			)}
		</div>
	);
}

export default Invoice;
