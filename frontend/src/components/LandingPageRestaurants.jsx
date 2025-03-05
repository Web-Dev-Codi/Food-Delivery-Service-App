/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";

function LandingPageRestaurants() {
	const [restaurants, setRestaurants] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");


	const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

	useEffect(() => {
		const fetchRestaurants = async () => {
			try {
				const response = await axios.get(
					`${API_URL}/api/restaurants`
				);
				setRestaurants(response.data.data.slice(0, 8)); // Fetch 8 restaurants for scrolling
			} catch (error) {
				setErrorMessage(
					error.response?.data?.message ||
						"An error occurred while fetching restaurants"
				);
			}
		};
		fetchRestaurants();
	}, []);

	// const scrollLeft = () => {
	// 	const container = document.getElementById("restaurants-container");
	// 	container.scrollBy({ left: -300, behavior: "smooth" });
	// };

	// const scrollRight = () => {
	// 	const container = document.getElementById("restaurants-container");
	// 	container.scrollBy({ left: 300, behavior: "smooth" });
	// };

	return (
		<div className="flex flex-col justify-center mx-auto items-center space-y-4 bg-slate-800 rounded-xl p-4 max-w-[1920px]">
			<div className="flex justify-between items-center w-full ">
				<h5 className="text-lg sm:text-2xl font-bold text-white">
					Restaurants
				</h5>
				<Link
					to="/restaurants"
					className="text-orange-500 hover:text-orange-400 flex items-center">
					View All <FaChevronRight className="ml-1" />
				</Link>
			</div>

			<div className="w-full">
				<div
					id="restaurants-container"
					className="grid auto-rows-auto grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4 md:gap-6 w-full">
					{restaurants.length > 0 ? (
						restaurants.map((restaurant, index) => (
							<div
								key={index}
								className="flex flex-col h-full bg-gray-800/80 rounded-xl p-4 backdrop-blur-sm">
								<div className="aspect-w-16 aspect-h-9 mb-3">
									<img
										src={restaurant.images[0]}
										alt={restaurant.name}
										className="w-full h-48 md:h-40 rounded-lg object-cover"
									/>
								</div>
								<div className="flex flex-col flex-grow justify-between space-y-2">
									<div>
										<h3 className="text-white font-semibold truncate">
											{restaurant.name}
										</h3>
										<p className="text-gray-400 text-sm">
											Restaurant recommendation
										</p>
									</div>
									<div className="space-y-2">
										<div className="flex items-center">
											{[...Array(5)].map((_, i) => (
												<FaStar
													key={i}
													className={`w-4 h-4 ${
														i < 4.5
															? "text-yellow-400"
															: "text-gray-600"
													}`}
												/>
											))}
											<span className="text-white ml-2">
												4.5
											</span>
										</div>
										<div className="flex justify-between items-center">
											<Link
												to={`/restaurants/${restaurant._id}`}
												className="w-full bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors">
												Order Now
											</Link>
										</div>
									</div>
								</div>
							</div>
						))
					) : (
						<div className="text-center text-red-600 text-sm sm:text-xl font-semibold col-span-full">
							{errorMessage || "No restaurants available"}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default LandingPageRestaurants;
