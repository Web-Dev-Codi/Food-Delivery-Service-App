import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteMenu = () => {
	const [menuName, setMenuName] = useState(""); // User input (menu name)
	const [menuId, setMenuId] = useState(null); // Store found menu ID

	// Fetch menu by name
	const fetchMenu = async () => {
		try {
			const response = await axios.get(
				`http://localhost:8000/food/menu/getByName/${menuName}`
			);

			if (response.data.data) {
				setMenuId(response.data.data._id);
				toast.success(`Menu "${menuName}" found! Click delete.`);
			} else {
				setMenuId(null);
				toast.error("Menu item not found!");
			}
		} catch (error) {
			console.error("Error fetching menu:", error);
			setMenuId(null);
			toast.error("Error fetching menu. Please try again.");
		}
	};

	// Delete menu if found
	const handleDelete = async () => {
		if (!menuId) {
			toast.warn("No menu selected for deletion.");
			return;
		}

		try {
			await axios.delete(`http://localhost:8000/food/menu/${menuId}`);
			toast.success(`Menu "${menuName}" deleted successfully!`);
			setMenuName(""); // Clear input
			setMenuId(null); // Reset ID
		} catch (error) {
			console.error("Error deleting menu:", error);
			toast.error("Error deleting menu. Please try again.");
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen w-full">
			<div className="bg-neutral-800/30 backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md">
				<h1 className="text-2xl font-bold mb-6 text-center text-white">
					Delete Menu
				</h1>

				{/* Search Menu By Name */}
				<div className="mb-4">
					<label className="p-1 block font-bold text-neutral-100">
						Enter Menu Name:
					</label>
					<input
						type="text"
						placeholder="Enter Menu Name"
						value={menuName}
						onChange={(e) => setMenuName(e.target.value)}
						className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-900 text-white"
					/>
					<button
						onClick={fetchMenu}
						className="mt-2 w-full py-2 bg-blue-700 font-bold text-white rounded-lg hover:bg-blue-600">
						Search Menu
					</button>
				</div>

				{/* Delete Button */}
				<button
					onClick={handleDelete}
					disabled={!menuId} // Disable if menu not found
					className={`w-full py-2 font-bold rounded-lg ${
						menuId
							? "bg-red-700 hover:bg-red-600 text-white"
							: "bg-gray-600 text-gray-400 cursor-not-allowed"
					}`}>
					Delete Menu
				</button>
			</div>
		</div>
	);
};

export default DeleteMenu;
