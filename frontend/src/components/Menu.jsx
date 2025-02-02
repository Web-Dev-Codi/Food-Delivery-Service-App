import { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Menu = () => {
	const [menuItems, setMenuItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { addToCart } = useCart();
	const [selectedCategory, setSelectedCategory] = useState("all");

	const categories = [
		"all",
		"Main Course",
		"Dessert",
		"Starters",
		"Beverages",
	];

	useEffect(() => {
		const fetchMenuItems = async () => {
			try {
				const response = await axios.get("http://localhost:8000/menu");
				setMenuItems(response.data);
			} catch (err) {
				setError("Failed to fetch menu items");
				console.error("Error fetching menu items:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchMenuItems();
	}, []);

	const handleAddToCart = (item) => {
		addToCart({
			...item,
			quantity: 1,
		});
	};

	const filteredItems =
		selectedCategory === "all"
			? menuItems
			: menuItems.filter((item) => item.category === selectedCategory);

	if (loading) return <div className="text-center p-4">Loading...</div>;
	if (error)
		return <div className="text-center text-red-500 p-4">{error}</div>;

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-8">
				<h1 className="text-3xl font-bold mb-4">Our Menu</h1>
				<div className="flex flex-wrap gap-2">
					{categories.map((category) => (
						<button
							key={category}
							onClick={() => setSelectedCategory(category)}
							className={`px-4 py-2 rounded-full transition-colors ${
								selectedCategory === category
									? "bg-green-500 text-white"
									: "bg-gray-200 text-gray-700 hover:bg-gray-300"
							}`}>
							{category.charAt(0).toUpperCase() +
								category.slice(1)}
						</button>
					))}
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{filteredItems.map((item) => (
					<div
						key={item._id}
						className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
						<img
							src={item.imageUrl}
							alt={item.name}
							className="w-full h-48 object-cover"
						/>
						<div className="p-4">
							<h3 className="text-xl font-semibold mb-2">
								{item.name}
							</h3>
							<p className="text-gray-600 mb-4 h-12 overflow-hidden">
								{item.description}
							</p>
							<div className="flex justify-between items-center">
								<span className="text-lg font-bold text-green-600">
									${item.price.toFixed(2)}
								</span>
								<button
									onClick={() => handleAddToCart(item)}
									disabled={!item.availability}
									className={`px-4 py-2 rounded ${
										item.availability
											? "bg-green-500 text-white hover:bg-green-600 transition-colors"
											: "bg-gray-300 text-gray-500 cursor-not-allowed"
									}`}>
									{item.availability
										? "Add to Cart"
										: "Out of Stock"}
								</button>
							</div>
						</div>
					</div>
				))}
			</div>

			<Link
				to="/cart"
				className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-105">
				<span className="sr-only">View Cart</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
					/>
				</svg>
			</Link>
		</div>
	);
};

export default Menu;
