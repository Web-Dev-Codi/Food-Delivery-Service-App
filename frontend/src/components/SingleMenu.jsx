import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import {FaStar,FaStarHalfAlt, FaRegStar} from "react-icons/fa";

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
		// Render Star Rating
		const renderStars = (rating) => {
			const fullStars = Math.floor(rating);
			const halfStar = rating % 1 !== 0;
			const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
	
			return (
				<div className="flex items-center text-yellow-500">
					{[...Array(fullStars)].map((_, i) => (
						<FaStar key={i} className="text-lg" />
					))}
					{halfStar && <FaStarHalfAlt className="text-lg" />}
					{[...Array(emptyStars)].map((_, i) => (
						<FaRegStar key={i} className="text-lg" />
					))}
				</div>
			);
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
		<div className="bg-gradient-to-t from-neutral-900 via-[#050407] to-[#4d4c4d] p-2 py-4 sm:p-4 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto overflow-hidden">
			<div className=" bg-neutral-800/10 backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md mx-auto border border-neutral-600 ">
				<h2 className="text-2xl font-bold text-center text-neutral-100 mb-4 ">
					{menu.name}
				</h2>
				<img
					src={menu.imageUrl}
					alt={menu.name}
					className="w-full h-64 object-cover mb-4 rounded-md"
				/>
				{/* Menu Details are hacked with inline styles for color details */}
				<p className="text-green-600 mb-2">
					<strong>Category:</strong>{" "}
					<span className="text-neutral-100">
						{menu.category || "N/A"}
					</span>
				</p>
				<p className="text-green-600 mb-2">
					<strong>Description:</strong>{" "}
					<span className="text-neutral-100">{menu.description}</span>
				</p>
				<p className="text-green-600 mb-2">
					<strong>Category:</strong>{" "}
					<span className="text-neutral-100">{menu.category}</span>
				</p>
					{/* Rating (with Stars) */}
					<p className="text-green-600 mb-2 flex items-center">
					<strong className="mr-2">Rating:</strong> {renderStars(menu.ratings)}
				</p>
				{/* Availability is hacked with the ternary condition if available or not. It is also styled with inline red or green color */}
				<p className="mb-2">
					<strong>Availability:</strong>{" "}
					<span
						className={
							menu.availability === "Available"
								? "text-green-300"
								: "text-red-600"
						}
						onClick={handleClick}>
						{menu.availability || "Unknown"}
					</span>
				</p>
				<p className="text-lg font-semibold text-green-600 mb-4">
					${menu.price}
				</p>
				<button
					type="button"
					className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
					onClick={handleClick}
					disabled={isLoading}>
					{isLoading ? "Adding..." : "Add to Cart"}
				</button>
				{errorMessage && (
					<div className="text-red-600 mt-4">{errorMessage}</div>
				)}
			</div>
		</div>
	);
}

export default SingleMenu;
