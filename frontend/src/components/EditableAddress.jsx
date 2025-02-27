import { useState } from "react";
import { Edit2, Check, X, MapPin } from "lucide-react";
import PropTypes from "prop-types";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditableAddress = ({ address }) => {
	const { userId } = useParams();
	const [isEditing, setIsEditing] = useState(false);
	const [data, setData] = useState({
		street: address.street,
		city: address.city,
		zipCode: address.zipCode,
	});

	// Toggle edit mode
	const handleEditClick = () => {
		setIsEditing(true);
	};

	// Cancel edit mode and reset form
	const handleCancel = () => {
		setIsEditing(false);
		setData({
			street: address.street,
			city: address.city,
			zipCode: address.zipCode,
		});
	};

	const handleChange = (e) => {
		setData((data) => ({
			...data,
			[e.target.name]: e.target.value,
		}));
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const token = localStorage.getItem("token");
			if (!token) {
				toast.error("Unauthorized. Please login to continue.");
				return;
			}
			const res = await axios.patch(
				`http://localhost:8000/data/update/${userId}`,
				data,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);
			setData(res.data.data);
			setIsEditing(false);
		} catch (error) {
			console.error("Error updating address:", error);
			setIsEditing(false);
		}
	};

	return (
		<div className="border rounded-lg p-4 hover:border-[#D84418] transition-colors border-[#D84418]/30">
			{isEditing ? (
				// Edit mode
				<form
					onSubmit={handleSubmit}
					className="space-y-4">
					<div>
						<label
							htmlFor="street"
							className="block text-sm font-medium text-gray-700">
							Street Name and Number
						</label>
						<input
							type="text"
							id="street"
							name="street"
							value={data?.street}
							onChange={handleChange}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
							required
						/>
					</div>
					<div>
						<label
							htmlFor="city"
							className="block text-sm font-medium text-gray-700">
							City
						</label>
						<input
							type="text"
							id="city"
							name="city"
							value={data?.city}
							onChange={handleChange}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
							required
						/>
					</div>
					<div>
						<label
							htmlFor="zipCode"
							className="block text-sm font-medium text-gray-700">
							Zip Code
						</label>
						<input
							type="text"
							id="zipCode"
							name="zipCode"
							value={data?.zipCode}
							onChange={handleChange}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
							required
						/>
					</div>
					<div className="flex justify-end space-x-2">
						<button
							type="button"
							onClick={handleCancel}
							className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
							<X
								size={16}
								className="mr-1"
							/>
							Cancel
						</button>
						<button
							type="submit"
							className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
							<Check
								size={16}
								className="mr-1"
							/>
							Save
						</button>
					</div>
				</form>
			) : (
				// Display mode
				<div className=" ">
					<div
						key={address.id}
						className="">
						<div className="flex justify-between items-start">
							<div className="flex items-start space-x-3">
								<MapPin
									className="text-[#D84418] mt-1"
									size={20}
								/>
								<div>
									<h4 className="font-medium text-white">
										{address.street}
									</h4>
									<p className="text-gray-400 text-sm">
										{address.city}, {address.zipCode}
									</p>
								</div>
							</div>
							<button
								onClick={handleEditClick}
								className="text-[#D84418] hover:text-[#FF6B6B] transition-colors">
								<Edit2 size={18} />
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

EditableAddress.propTypes = {
	address: PropTypes.object.isRequired,
	onAddressUpdate: PropTypes.func,
};

export default EditableAddress;
