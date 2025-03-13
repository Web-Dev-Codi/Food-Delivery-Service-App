import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const UpdateRestaurantForm = () => {
	const [restaurantName, setRestaurantName] = useState(""); // Search input for restaurant name
	const [formData, setFormData] = useState({
		name: "",
		location: "",
		images: [],
		contact: "",
		operatingHours: {
			monday: "",
			tuesday: "",
			wednesday: "",
			thursday: "",
			friday: "",
			saturday: "",
			sunday: "",
		},
	});
	const [isRestaurantFound, setIsRestaurantFound] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

	const fetchRestaurantByName = async () => {
		try {
			setIsLoading(true);
			const response = await axios.get(
				`${API_URL}/api/restaurants/name/${restaurantName}`
			);

			if (response.data.data && response.data.data.length > 0) {
				const restaurant = response.data.data[0];
				setFormData(restaurant);
				setIsRestaurantFound(true);
			} else {
				toast.error("Restaurant not found!");
				setIsRestaurantFound(false);
			}
		} catch (error) {
			console.error("Error fetching restaurant:", error);
			toast.error(
				"Error fetching restaurant. Please check the name and try again."
			);
			setIsRestaurantFound(false);
		} finally {
			setIsLoading(false);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleOperatingHoursChange = (day, value) => {
		setFormData({
			...formData,
			operatingHours: {
				...formData.operatingHours,
				[day]: value,
			},
		});
	};

	const openCloudinaryWidget = () => {
		window.cloudinary.openUploadWidget(
			{
				cloudName: "difmxsysx",
				uploadPreset: "restaurant_images_upload",
				multiple: true,
				sources: ["local", "url", "camera"],
				maxFiles: 5,
			},
			(error, result) => {
				if (error) {
					console.error("Cloudinary Error:", error);
					toast.error("Image upload failed. Please try again.");
					return;
				}
				if (result.event === "success") {
					setFormData((prevData) => ({
						...prevData,
						images: [...prevData.images, result.info.secure_url],
					}));
				}
			}
		);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData._id) {
			toast.error("Invalid restaurant. Please try again.");
			return;
		}

		try {
			const token = localStorage.getItem("token");
			if (!token) {
				toast.error("Unauthorized. Please log in to continue.");
				return;
			}

			await axios.patch(
				`${API_URL}/api/update/${formData._id}`,
				formData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			toast.success("Restaurant updated successfully!");
		} catch (error) {
			console.error("Error updating restaurant:", error);
			toast.error("Failed to update restaurant. Please try again.");
		}
	};

	return (
		<div className="min-h-screen flex justify-center items-start w-full md:mt-4 md:pt-24">
			<div className="bg-red-950/30 backdrop-blur p-8 rounded-lg shadow-lg w-full max-w-md overflow-y-auto min-h-screen ">
				<h1 className="text-2xl font-bold mb-6 md:mt-[-.5rem] text-center text-white">
					Update Restaurant
				</h1>

				{/* Search Restaurant By Name */}
				<div className="mb-4">
					<label className="p-1 block font-bold text-neutral-100">
						Enter Restaurant Name:
						<input
							type="text"
							value={restaurantName}
							onChange={(e) => setRestaurantName(e.target.value)}
							className="w-full mt-1 px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white bg-black/60 focus:bg-black/80 text-white"
						/>
					</label>
					<button
						type="button"
						onClick={fetchRestaurantByName}
						className="mt-4 w-full py-2 bg-orange-700 font-bold text-white rounded-lg hover:bg-orange-600">
						{isLoading ? "Searching..." : "Search Restaurant"}
					</button>
				</div>

				{/* If restaurant found, show the update form */}
				{isRestaurantFound && (
					<form
						onSubmit={handleSubmit}
						className="space-y-4">
						{/* Name */}
						<div>
							<label className="p-1 block font-bold text-neutral-100">
								Name:
								<input
									type="text"
									name="name"
									value={formData.name}
									onChange={handleChange}
									required
									className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-black/60 focus:bg-black/80 text-white"
								/>
							</label>
						</div>

						{/* Location */}
						<div>
							<label className="p-1 block font-bold text-neutral-100">
								Location:
								<input
									type="text"
									name="location"
									value={formData.location}
									onChange={handleChange}
									required
									className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-black/60 focus:bg-black/80 text-white"
								/>
							</label>
						</div>

						{/* Contact */}
						<div>
							<label className="p-1 block font-bold text-neutral-100">
								Contact:
								<input
									type="text"
									name="contact"
									value={formData.contact}
									onChange={handleChange}
									required
									className="w-full mt-1 px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white bg-black/60 focus:bg-black/80 text-white"
								/>
							</label>
						</div>

						{/* Image Upload */}
						<div className="bg-black/60 p-4 rounded-lg shadow-lg border border-gray-700">
							<p className="block text-lg font-semibold text-neutral-100 mb-2">
								Update Images:
							</p>
							<button
								type="button"
								onClick={openCloudinaryWidget}
								className="mt-2 w-full py-2 bg-orange-700 font-bold text-white rounded-lg hover:bg-orange-600">
								Upload Images
							</button>
							<div className="mt-4 flex flex-wrap gap-4">
								{formData.images.map((image, index) => (
									<div
										// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
										key={index}
										className="relative w-24 h-24 sm:w-28 sm:h-28 overflow-hidden rounded-lg border border-gray-500 shadow-md">
										<img
											src={image}
											alt={`Names ${index + 1}`}
											className="w-full h-full object-cover"
										/>
										<button
											type="button"
											onClick={() =>
												setFormData((prevData) => ({
													...prevData,
													images: prevData.images.filter(
														(_, i) => i !== index
													),
												}))
											}
											className="absolute top-1 right-1 bg-red-700 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold shadow-lg opacity-80 hover:opacity-100 transition">
											X
										</button>
									</div>
								))}
							</div>
						</div>

						{/* Operating Hours */}
						<div>
							<h3 className="py-2 block font-bold text-neutral-100 md:text-center md:py-4 ">
								Operating Hours
							</h3>
							<div className="grid grid-cols-1 gap-4">
								{Object.entries(formData.operatingHours).map(
									([day, hours]) => (
										<div key={day}>
											<label className="block text-sm font-medium text-gray-100 capitalize">
												<span className="p-1 block font-bold">
													{day}
												</span>
												<input
													type="text"
													value={hours}
													onChange={(e) =>
														handleOperatingHoursChange(
															day,
															e.target.value
														)
													}
													className="w-full mt-1 px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white bg-black/60 focus:bg-black/80 text-white"
												/>
											</label>
										</div>
									)
								)}
							</div>
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							className="w-full py-2 bg-orange-700 font-bold text-white rounded-lg hover:bg-orange-600">
							Update Restaurant
						</button>
					</form>
				)}
			</div>
		</div>
	);
};

export default UpdateRestaurantForm;
