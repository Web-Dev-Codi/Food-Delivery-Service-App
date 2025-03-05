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

	const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

	useEffect(() => {
		const fetchRestaurants = async () => {
			try {
				const response = await axios.get(`${API_URL}/api/restaurants`);
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
				`${API_URL}/food/menu`,
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
    <div className="flex items-center justify-center w-full md:mt-3 ">
      <div className="bg-red-800/30 backdrop-blur p-8 rounded-lg shadow-lg w-full max-w-md min-h-screen ">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Add Menu
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="p-1 block font-bold text-neutral-100">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 text-white"
            />
          </div>

					<div>
						<label className="p-1 block font-bold text-neutral-100">
							Price:
						</label>
						<input
							type="number"
							id="price"
							name="price"
							value={formData.price}
							onChange={handleChange}
							min="1"
							required
							className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 text-white"
						/>
					</div>

					<div>
						<label className="p-1 block font-bold text-neutral-100">
							Description:
						</label>
						<textarea
							id="description"
							name="description"
							value={formData.description}
							onChange={handleChange}
							required
							className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 text-white"
						/>
					</div>

					<div>
						<label className="p-1 block font-bold text-neutral-100">
							Category:
						</label>
						<select
							id="category"
							name="category"
							value={formData.category}
							onChange={handleChange}
							required
							className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 text-white">
							<option value="">Select Category</option>
							<option value="Main Course">Main Course</option>
							<option value="Dessert">Dessert</option>
							<option value="Starters">Starters</option>
							<option value="Beverages">Beverages</option>
						</select>
					</div>

					{/* Image Upload */}
					<div>
						<label className="p-1 block font-bold text-neutral-100">
							Image:
						</label>
						<button
							type="button"
							onClick={openCloudinaryWidget}
							className="mt-2 w-full py-2  bg-orange-700 font-bold text-white rounded-lg hover:bg-orange-600">
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
						<label className="p-1 block font-bold text-neutral-100">
							Availability:
						</label>
						<select
							id="availability"
							name="availability"
							value={formData.availability}
							onChange={handleChange}
							required
							className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 text-white">
							<option value="Available">Available</option>
							<option value="Not Available">Not Available</option>
						</select>
					</div>

					{/* Hey; I just add extra div here to recover the dropdown option */}

					<div>
						<label className="p-1 block font-bold text-neutral-100">
							Restaurant:
						</label>
						<select
							id="restaurant"
							name="restaurant"
							value={formData.restaurant}
							onChange={handleChange}
							required
							className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 text-white">
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

					<button
						type="submit"
						className="w-full py-2 bg-orange-700 font-bold text-white rounded-lg hover:bg-orange-600">
						Add Menu
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddMenuForm;

/**
 * <select
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
 */
