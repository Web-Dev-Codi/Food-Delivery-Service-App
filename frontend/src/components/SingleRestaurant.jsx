/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { logosMap } from "../assets";

function SingleRestaurant() {
	const { id } = useParams();
	const [restaurant, setRestaurant] = useState(null);
	const [menus, setMenus] = useState([]);
	const [loading, setLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");
	const [menuCategory, setMenuCategory] = useState("Select");

	const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

	const navigate = useNavigate();
	// Fetch restaurant and menu data in a single useEffect
	useEffect(() => {
		const fetchData = async () => {
			try {
				const restaurantResponse = await axios.get(
					`${API_URL}/api/restaurants/${id}`
				);
				setRestaurant(restaurantResponse.data.data);

				const menuResponse = await axios.get(
					`${API_URL}/food/menu/restaurant/${id}`
				);
				setMenus(menuResponse.data.data);
			} catch (error) {
				setErrorMessage(
					error.response?.data?.message ||
						"An error occurred while fetching the restaurant details"
				);
			}
			setLoading(false);
		};

		fetchData();
	}, [id]);

	if (loading) {
		return (
			<div
				className="flex justify-center items-center h-screen text-lg font-semibold"
				role="status"
				aria-live="polite">
				Loading...
			</div>
		);
	}

	if (!restaurant) {
		return (
			<div
				className="flex justify-center items-center h-screen text-lg font-semibold"
				role="alert">
				Restaurant not found.
			</div>
		);
	}

	// Filter menus based on category selection
	const filteredMenus =
		menuCategory === "Select"
			? menus
			: menus.filter((menu) => menu.category === menuCategory);

	const handleClick = (menuId) => {
		navigate(`/menu/${menuId}`);

		console.log("show Details");
	};

	return (
		<main className="bg-neutral-900 p-2 py-4 sm:p-4 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto overflow-hidden">
			{/* Restaurant Image and Info Section */}
			<section
				aria-labelledby="restaurant-name"
				className="relative justify-center mb-20">
				<img
					src={restaurant.images[0]}
					alt={`${restaurant.name} restaurant ambiance`}
					className="w-full h-64 object-cover rounded-lg mb-8"
				/>

				{/* Restaurant Info */}
				<div className="absolute left-4 right-4 bottom-[-2] transform -translate-y-1/2 bg-neutral-800/60 backdrop-blur-md rounded-lg p-6 shadow-lg flex items-center justify-center gap-8 border border-neutral-600">
					{/* Restaurant Logo */}
					<img
						className="w-16 h-16 object-cover rounded-full overflow-hidden"
						src={logosMap[restaurant.name]}
						alt={`${restaurant.name} logo`}
					/>

					{/* Restaurant name */}
					<div>
						<h1
							id="restaurant-name"
							className="text-2xl font-bold text-neutral-200">
							{restaurant.name}
						</h1>

						<p className="text-gray-200">{restaurant.location}</p>
						<p className="text-gray-200">{restaurant.contact}</p>
					</div>
				</div>
			</section>

			{/* Category Filter */}
			<div className="mb-4">
				<label
					htmlFor="menu-category"
					className="sr-only">
					Filter menu by category
				</label>
				<select
					id="menu-category"
					className="w-full bg-neutral-900 text-neutral-300 px-4 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-neutral-400"
					value={menuCategory}
					onChange={(e) => setMenuCategory(e.target.value)}
					aria-label="Filter menu by category">
					<option value="Select">All Categories</option>
					<option value="Main Course">Main Course</option>
					<option value="Dessert">Dessert</option>
					<option value="Beverages">Beverages</option>
				</select>
			</div>

			{/* Menu Section */}
			<section
				aria-labelledby="menu-heading"
				className="text-center bg-gradient-to-r from-neutral-900 via-[#050407] to-[#4d4c4d] p-4 rounded-lg shadow-lg">
				<h2
					id="menu-heading"
					className="sr-only">
					Restaurant Menu
				</h2>

				{errorMessage && (
					<div
						className="text-red-600 mb-4"
						role="alert">
						{errorMessage}
					</div>
				)}

				{filteredMenus.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{filteredMenus.map((menu) => (
							<article
								key={menu._id}
								className="flex flex-row md:flex-col items-center gap-6 bg-neutral-800/60 backdrop-blur-md p-3 rounded-lg shadow-md border border-neutral-600 hover:shadow-xl transition transform hover:bg-neutral-950 duration-300 ease-in-out">
								{/* Menu Image */}
								<img
									src={menu.imageUrl}
									alt={`${menu.name} dish`}
									className="w-32 h-32 md:w-full md:h-48 object-cover rounded-lg shadow-md"
								/>

								{/* Menu Content */}
								<div className="flex-1 text-left">
									<h3 className="text-neutral-100 text-lg font-bold mb-1">
										{menu.name}
									</h3>
									<p className="text-gray-200 text-lg font-medium mb-4">
										<span className="sr-only">Price:</span>{" "}
										€{menu.price}
									</p>
									<button
										type="button"
										onClick={() => handleClick(menu._id)}
										className="bg-transparent text-green-400 px-4 py-2 rounded-md hover:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-green-400"
										aria-label={`Show details for ${menu.name}`}>
										Show Details
									</button>
								</div>
							</article>
						))}
					</div>
				) : (
					<p
						className="text-gray-200"
						role="status">
						No menus available.
					</p>
				)}
			</section>
		</main>
	);
}

export default SingleRestaurant;
