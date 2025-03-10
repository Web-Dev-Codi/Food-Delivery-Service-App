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
		<>
			<div className="bg-black/30 p-2 py-4 sm:p-4 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto overflow-hidden cursor-pointer">
				{/* Restaurant Image */}
				<div className="relative justify-center">
					<img
						src={restaurant.images[0]}
						alt={restaurant.name}
						className="w-full h-64 object-cover rounded-lg mb-8"
					/>

					{/* Restaurant Info */}
					<div className="absolute left-4 right-4 bottom-[-2] transform -translate-y-1/2 bg-black/30 backdrop-blur-md rounded-lg p-6 shadow-lg flex items-center justify-center gap-8 border border-transparent">
						{/* Restaurant Logo */}
						<img
							className="w-16 h-16 object-cover rounded-full overflow-hidden"
							src={logosMap[restaurant.name]} // Default to spiceOfIndia if no match
							alt={restaurant.name}
						/>

						{/* Restaurant name */}
						<div>
							<h2 className="text-2xl font-bold text-[#FF5733]">
								{restaurant.name}
							</h2>

							<p className="text-gray-200">
								{restaurant.location}
							</p>
							<p className="text-gray-200">
								{restaurant.contact}
							</p>
						</div>
					</div>
				</div>
				<div className="relative w-full mt-32 mb-4">
					<select
						className="w-full px-4 py-4 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-red-950/30 focus:bg-black/80 text-white font-extrabold border border-gray-600 cursor-pointer appearance-none shadow-lg transition-all"
						value={menuCategory}
						onChange={(e) => setMenuCategory(e.target.value)}>
						<option
							className="bg-black"
							value="Select">
							All Categories
						</option>
						<option
							className="bg-black"
							value="Main Course">
							Main Course
						</option>
						<option
							className="bg-black"
							value="Dessert">
							Dessert
						</option>
						<option
							className="bg-black"
							value="Beverages">
							Beverages
						</option>
					</select>

					{/* appearance-none and custom a new Arrow Icon */}
					<div className="absolute text-3xl font-extrabold p-1 top-1/2 right-4 -translate-y-1/2 pointer-events-none">
						⌄
					</div>
				</div>

				{/* Menu Section */}
				<div className="text-center bg-transparent p-4 rounded-lg shadow-lg cursor-pointer">
					{filteredMenus.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{filteredMenus.map((menu) => (
								<div
									key={menu._id}
									onClick={() => handleClick(menu._id)}
									className="flex flex-row md:flex-col items-center gap-6 bg-black/30 backdrop-blur-md p-3 rounded-lg shadow-md border border-gray-800 hover:shadow-xl hover:bg-black/60 hover:scale-105 transition-transform duration-300 ease-in-out">
									{/* Menu Image */}
									<img
										src={menu.imageUrl}
										alt={menu.name}
										className="w-32 h-32 md:w-full md:h-48 object-cover rounded-lg shadow-md"
									/>

									{/* Menu Content */}
									<div className="flex-1 text-left">
										<p className="text-neutral-100 text-lg font-bold mb-1">
											{menu.name}
										</p>
										<p className="text-gray-200 text-lg font-medium mb-4">
											€{menu.price}
										</p>
										<button
											type="button"
											onClick={() =>
												handleClick(menu._id)
											}
											className="bg-transparent font-semibold text-md text-green-600 px-4 py-2 rounded-md hover:text-neutral-100">
											Yummy Details
										</button>
									</div>
								</div>
							))}
						</div>
					) : (
						<p className="text-gray-200">No menus available.</p>
					)}
				</div>

				{/* Error Message */}
				{errorMessage && (
					<div className="text-red-600">{errorMessage}</div>
				)}
			</div>
		</>
	);
}

export default SingleRestaurant;
