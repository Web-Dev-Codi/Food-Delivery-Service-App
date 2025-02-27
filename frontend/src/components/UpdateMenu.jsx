import { useState, useEffect } from "react";
import axios from "axios";

const UpdateMenuForm = () => {
	const [menuName, setMenuName] = useState(""); // Search input for menu name
	const [formData, setFormData] = useState({
		name: "",
		price: "",
		short_desc: "",
		description: "",
		category: "",
		imageUrl: "",
		availability: "Available",
		restaurant: "",
		ratings: 0,
	});

	const [restaurants, setRestaurants] = useState([]);
	const [isMenuFound, setIsMenuFound] = useState(false);

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

	const fetchMenuByName = async () => {
		try {
			const response = await axios.get(
				`http://localhost:8000/food/menu/getByName/${menuName}`
			);
			if (response.data.data) {
				setFormData(response.data.data);
				setIsMenuFound(true);
			} else {
				alert("Menu item not found!");
				setIsMenuFound(false);
			}
		} catch (error) {
			console.error("Error fetching menu:", error);
			alert("Error fetching menu. Please check the name and try again.");
			setIsMenuFound(false);
		}
	};

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
				cloudName: "difmxsysx",
				uploadPreset: "menu_upload",
				multiple: false,
				sources: ["local", "url", "camera"],
			},
			(error, result) => {
				if (!error && result && result.event === "success") {
					console.log("Upload Success:", result.info.secure_url);
					setFormData((prevData) => ({
						...prevData,
						imageUrl: result.info.secure_url, // Update the image URL
					}));
				} else if (error) {
					console.error("Upload Error:", error);
					alert("Image upload failed. Please try again.");
				}
			}
		);

		widget.open();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.patch(
				`http://localhost:8000/food/menu/${formData._id}`,
				formData
			);
			alert("Menu updated successfully!");
		} catch (error) {
			console.error("Error updating menu:", error);
			alert("Failed to update menu. Please try again.");
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen w-full">
			<div className="bg-neutral-800/30 backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md">
				<h1 className="text-2xl font-bold mb-6 text-center text-white">
					Update Menu
				</h1>

				{/* Search Menu By Name */}
				<div className="mb-4">
					<label className="p-1 block font-bold text-neutral-100">
						Enter Menu Name:
					</label>
					<input
						type="text"
						value={menuName}
						onChange={(e) => setMenuName(e.target.value)}
						className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-900 text-white"
					/>
					<button
						onClick={fetchMenuByName}
						className="mt-2 w-full py-2 bg-blue-700 font-bold text-white rounded-lg hover:bg-blue-600">
						Search Menu
					</button>
				</div>

				{/* If menu found, show the update form */}
				{isMenuFound && (
					<form
						onSubmit={handleSubmit}
						className="space-y-4">
						<div>
							<label className="p-1 block font-bold text-neutral-100">
								Name:
							</label>
							<input
								type="text"
								name="name"
								value={formData.name}
								onChange={handleChange}
								required
								className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-900 text-white"
							/>
						</div>

						<div>
							<label className="p-1 block font-bold text-neutral-100">
								Price:
							</label>
							<input
								type="number"
								name="price"
								value={formData.price}
								onChange={handleChange}
								min="1"
								required
								className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-900 text-white"
							/>
						</div>

						<div>
							<label className="p-1 block font-bold text-neutral-100">
								Short Description:
							</label>
							<input
								type="text"
								name="short_desc"
								value={formData.short_desc}
								onChange={handleChange}
								required
								className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-900 text-white"
							/>
						</div>

						<div>
							<label className="p-1 block font-bold text-neutral-100">
								Description:
							</label>
							<textarea
								name="description"
								value={formData.description}
								onChange={handleChange}
								required
								className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-900 text-white"
							/>
						</div>

						<div>
							<label className="p-1 block font-bold text-neutral-100">
								Category:
							</label>
							<select
								name="category"
								value={formData.category}
								onChange={handleChange}
								required
								className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-900 text-white">
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
								className="mt-2 w-full py-2 bg-orange-700 font-bold text-white rounded-lg hover:bg-orange-600">
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
								Ratings (0-5):
							</label>
							<input
								type="number"
								name="ratings"
								value={formData.ratings}
								onChange={handleChange}
								min="0"
								max="5"
								step="0.1" // Allow decimal ratings
								required
								className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-900 text-white"
							/>
						</div>

						<button
							type="submit"
							className="w-full py-2 bg-orange-700 font-bold text-white rounded-lg hover:bg-orange-600">
							Update Menu
						</button>
					</form>
				)}
			</div>
		</div>
	);
};

export default UpdateMenuForm;
