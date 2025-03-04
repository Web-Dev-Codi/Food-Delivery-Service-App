import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UtensilsCrossed, ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { toast, Bounce } from "react-toastify";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function SingleMenu() {
	const { id } = useParams();
	const navigate = useNavigate();
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

			// Enhanced toast notification with action button
			toast.success(
				<div className="flex flex-col">
					<div>Added 1x {menu.name} to cart</div>
					<button
						onClick={() => navigate(-1)}
						className="text-xs mt-2 bg-orange-700 text-white px-2 py-1 rounded self-start hover:bg-green-500 hover:text-white transition-colors text-semibold">
						Back to Restaurant
					</button>
				</div>,
				{
					position: "bottom-right",
					autoClose: 5000, // Extended to give more time to use the button
					hideProgressBar: false,
					closeOnClick: false,
					pauseOnHover: true,
					draggable: false,
					transition: Bounce,
					theme: "dark",
					icon: <UtensilsCrossed />,
				}
			);
		} catch (err) {
			console.error("Failed to add to cart:", err);
			toast.error("Failed to add item to cart");
		} finally {
			setIsLoading(false);
		}
	};

	// Handle back button click
	const handleBackClick = () => {
		navigate(-1); // Go back to previous page
	};

	// Render Star Rating
	const renderStars = (rating) => {
		const fullStars = Math.floor(rating);
		const halfStar = rating % 1 !== 0;
		const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

		return (
			<span className="flex items-center text-yellow-500">
				{[...Array(fullStars)].map((_, i) => (
					<FaStar
						key={i}
						className="text-lg"
					/>
				))}
				{halfStar && <FaStarHalfAlt className="text-lg" />}
				{[...Array(emptyStars)].map((_, i) => (
					<FaRegStar
						key={i}
						className="text-lg"
					/>
				))}
			</span>
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
		<div className="flex justify-center items-center min-h-screen py-8">
			<div className="bg-gradient-to-t from-neutral-900 via-[#050407] to-[#4d4c4d] p-4 rounded-lg shadow-lg w-full max-w-md md:max-w-4xl mx-auto overflow-hidden">
				{/* Back button for mobile view */}
				<button
					onClick={handleBackClick}
					className="flex items-center text-neutral-100 mb-4 hover:text-green-500 transition md:hidden">
					<ArrowLeft
						className="mr-1"
						size={18}
					/>
					Back to Restaurant
				</button>

				<div className="bg-neutral-800/10 backdrop-blur-md rounded-lg shadow-lg w-full border border-neutral-600 overflow-hidden">
					{/* Flex container for desktop layout */}
					<div className="flex flex-col md:flex-row">
						{/* Left side - Image (full height on desktop) */}
						<div className="md:w-1/2 md:h-full">
							<img
								src={menu.imageUrl}
								alt={menu.name}
								className="w-full h-64 md:h-full object-cover"
							/>
						</div>

						{/* Right side - Details */}
						<div className="p-8 md:w-1/2">
							{/* Back button for desktop view */}
							<button
								onClick={handleBackClick}
								className="hidden md:flex items-center text-neutral-100 mb-4 hover:text-green-500 transition">
								<ArrowLeft
									className="mr-1"
									size={18}
								/>
								Back to Restaurant
							</button>

							<h2 className="text-2xl font-bold text-neutral-100 mb-4">
								{menu.name}
							</h2>

							{/* Menu Details */}
							<p className="text-[#D84418] mb-2">
								<strong>Category:</strong>{" "}
								<span className="text-neutral-100">
									{menu.category || "N/A"}
								</span>
							</p>
							<p className="text-[#D84418] mb-2">
								<strong>Description:</strong>{" "}
								<span className="text-neutral-100">
									{menu.description}
								</span>
							</p>

							{/* Rating (with Stars) */}
							<p className="text-[#D84418] mb-2 flex items-center">
								<strong className="mr-2">Rating:</strong>{" "}
								{renderStars(menu.ratings)}
							</p>

							{/* Availability */}
							<p className="mb-2">
								<strong className="text-[#D84418]">
									Availability:
								</strong>{" "}
								<span
									className={
										menu.availability === "Available"
											? "text-green-300"
											: "text-red-600"
									}>
									{menu.availability || "Unknown"}
								</span>
							</p>

							<p className="text-lg font-semibold text-[#D84418] mb-4">
								${menu.price}
							</p>

							<button
								type="button"
								className="w-full bg-[#D84418] text-white px-4 py-2 rounded-md hover:bg-green-500 hover:text-black transition"
								onClick={handleClick}>
								Add to Cart
							</button>

							{errorMessage && (
								<div className="text-red-600 mt-4">
									{errorMessage}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SingleMenu;
