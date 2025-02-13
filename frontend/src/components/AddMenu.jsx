import { useState, useEffect } from "react";
import axios from "axios";

const AddMenuForm = () => {
	const [formData, setFormData] = useState({
		name: "",
		price: "",
		description: "",
		category: "",
		imageUrl: "",
		availability: "Available", // Match backend enum
		restaurant: "", // Store restaurant ID here
	});

	const [restaurants, setRestaurants] = useState([]); // Store list of restaurants

	useEffect(() => {
		const fetchRestaurants = async () => {
			try {
				const response = await axios.get(
					"http://localhost:8000/api/restaurants"
				);
				setRestaurants(response.data.data);
			} catch (error) {
				console.error("Error fetching restaurants:", error);
			}
		};

		fetchRestaurants();
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const openCloudinaryWidget = () => {
		window.cloudinary.openUploadWidget(
			{
				cloudName: "difmxsysx", // Your Cloudinary cloud name
				uploadPreset: "menu_upload", // Your unsigned upload preset
				multiple: false,
				sources: ["local", "url", "camera"], // Allow various sources
			},
			(error, result) => {
				if (!error && result && result.event === "success") {
					// Set the uploaded image URL to the formData
					setFormData((prevData) => ({
						...prevData,
						imageUrl: result.info.secure_url,
					}));
				}
			}
		);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"http://localhost:3006/food/menu",
				formData
			);
			console.log("Menu added successfully:", response.data.data);
			alert("Menu added successfully!");
			// Reset form after submission
			setFormData({
				name: "",
				price: "",
				description: "",
				category: "",
				imageUrl: "",
				availability: "Available",
				restaurant: "",
			});
		} catch (error) {
			console.error("Error adding menu:", error);
			alert("Failed to add menu. Please try again.");
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
			<div>
				<label
					htmlFor="name"
					className="block text-sm font-medium text-gray-700">
					Name:
				</label>
				<input
					type="text"
					id="name"
					name="name"
					value={formData.name}
					onChange={handleChange}
					className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
					required
				/>
			</div>

			<div>
				<label
					htmlFor="price"
					className="block text-sm font-medium text-gray-700">
					Price:
				</label>
				<input
					type="number"
					id="price"
					name="price"
					value={formData.price}
					onChange={handleChange}
					min="1"
					className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
					required
				/>
			</div>

			<div>
				<label
					htmlFor="description"
					className="block text-sm font-medium text-gray-700">
					Description:
				</label>
				<textarea
					id="description"
					name="description"
					value={formData.description}
					onChange={handleChange}
					className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
					required
				/>
			</div>

			<div>
				<label
					htmlFor="category"
					className="block text-sm font-medium text-gray-700">
					Category:
				</label>
				<select
					id="category"
					name="category"
					value={formData.category}
					onChange={handleChange}
					className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
					required>
					<option value="">Select Category</option>
					<option value="Main Course">Main Course</option>
					<option value="Dessert">Dessert</option>
					<option value="Starters">Starters</option>
					<option value="Beverages">Beverages</option>
				</select>
			</div>

			{/* Image Upload */}
			<div>
				<label
					htmlFor="imageUrl"
					className="block text-sm font-medium text-gray-700">
					Image:
				</label>
				<button
					type="button"
					onClick={openCloudinaryWidget}
					className="mt-2 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none">
					Upload Image
				</button>
				{formData.imageUrl && (
					<div className="mt-4">
						<img
							src={formData.imageUrl}
							alt="Uploaded"
							className="w-32 h-32 object-cover rounded-md"
						/>
					</div>
				)}
			</div>

			<div>
				<label
					htmlFor="availability"
					className="block text-sm font-medium text-gray-700">
					Availability:
				</label>
				<select
					id="availability"
					name="availability"
					value={formData.availability}
					onChange={handleChange}
					className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
					required>
					<option value="Available">Available</option>
					<option value="Not Available">Not Available</option>
				</select>
			</div>

			<div>
				<label
					htmlFor="restaurant"
					className="block text-sm font-medium text-gray-700">
					Restaurant:
				</label>
				<select
					id="restaurant"
					name="restaurant"
					value={formData.restaurant}
					onChange={handleChange}
					className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
					required>
					<option value="">Select Restaurant</option>
					{restaurants.map((restaurant) => (
						<option
							key={restaurant._id}
							value={restaurant._id}>
							{restaurant.name}
						</option>
					))}
				</select>
			</div>

			<div>
				<button
					type="submit"
					className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
					Add Menu
				</button>
			</div>
		</form>
	);
};

export default AddMenuForm;
