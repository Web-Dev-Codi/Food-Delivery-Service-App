import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function SingleMenu() {
	const { id } = useParams();
	const [menu, setMenu] = useState(null);
	const [loading, setLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");
	const [notification, setNotification] = useState({
		message: "",
		type: "", // success or error
	});
	const [isLoading, setIsLoading] = useState(false);

	const { state, addToCart } = useContext(CartContext); // Removed dispatch since it's not used

	// Fetch Menu Data
	useEffect(() => {
		const fetchMenu = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8000/food/menu/singlemenu/${id}`
				);
				setMenu(response.data.data);
			} catch (error) {
				setErrorMessage(
					error.response?.data?.message ||
						"An error occurred while fetching the menu details"
				);
			}
			setLoading(false);
		};

		fetchMenu();
	}, [id]);

	// Log Cart Updates
	useEffect(() => {
		console.log("Cart updated:", state.cart);
	}, [state.cart]);

	// Clear Notification after 3 seconds
	useEffect(() => {
		if (notification.message) {
			const timer = setTimeout(() => {
				setNotification({ message: "", type: "" });
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [notification.message]);

	const handleClick = async () => {
		if (isLoading) return; // Prevent duplicate clicks

		setIsLoading(true);
		try {
			const payload = {
				items: [
					{
						foodItemId: menu._id,
						quantity: 1,
					},
				],
			};
			await addToCart(payload);

			// Success notification
			setNotification({
				message: "Added to cart successfully!",
				type: "success",
			});
		} catch (err) {
			console.error("Failed to add to cart:", err);

			// Error notification
			setNotification({
				message: "Failed to add to cart. Please try again.",
				type: "error",
			});
		} finally {
			setIsLoading(false);
		}
	};

	// Conditional Rendering
	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen text-lg font-semibold">
				Loading...
			</div>
		);
	}

	if (!menu) {
		return (
			<div className="flex justify-center items-center h-screen text-lg font-semibold">
				Menu not found.
			</div>
		);
	}

	return (
		<div className="flex justify-center items-center h-screen text-lg font-semibold">
			<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
				<h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
					{menu.name}
				</h2>
				<img
					src={menu.imageUrl}
					alt={menu.name}
					className="w-full h-64 object-cover mb-4"
				/>
				<p className="text-gray-700 mb-4">{menu.description}</p>
				<p className="text-gray-700 mb-4">${menu.price}</p>
				<button
					type="button"
					onClick={handleClick}
					className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
					disabled={isLoading}>
					{isLoading ? "Adding..." : "Add to Cart"}
				</button>
				{errorMessage && (
					<div className="text-red-600">{errorMessage}</div>
				)}
				{notification.message && (
					<div
						className={`text-white p-2 mt-4 rounded-md ${
							notification.type === "success"
								? "bg-green-500"
								: "bg-red-500"
						}`}>
						{notification.message}
					</div>
				)}
			</div>
		</div>
	);
}

export default SingleMenu;
