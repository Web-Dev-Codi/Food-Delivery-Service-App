/* eslint-disable react-hooks/exhaustive-deps */
import { Edit2, Check, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

const EditableProfile = ({ name, email, contact }) => {
	const { userId } = useParams();
	const navigate = useNavigate();
	const [userData, setUserData] = useState({
		name: name || "",
		email: email || "",
		contact: contact || "",
	});
	const [isEditing, setIsEditing] = useState(false);
	const [error, setError] = useState(null);
	const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

	// Toggle edit mode
	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleCancel = () => {
		setIsEditing(false);
		setUserData({
			name: name || "",
			email: email || "",
			contact: contact || "",
		});
	};

	const handleChange = (e) => {
		setUserData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const token = localStorage.getItem("token");
			if (!token) {
				setError("No authentication token found");
				return;
			}

			const res = await axios.put(
				`${API_URL}/data/update/${userId}`,
				userData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);
			setIsEditing(false);
			setUserData(res.data.data);
		} catch (error) {
			console.error("Error updating user data:", error);
			setError(error.response?.data?.message);
		}
	};

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const token = localStorage.getItem("token");

				if (!token) {
					setError("No authentication token found");
					navigate("/login");
					return;
				}

				if (!userId) {
					setError("No user ID provided");
					navigate("/");
					return;
				}

				const response = await axios.get(
					`${API_URL}/data/users/${userId}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
							"Content-Type": "application/json",
						},
					}
				);

				setUserData(response.data.data);
				setIsEditing(false);
				console.log("User data:", response.data.data);
			} catch (error) {
				console.error("Error fetching user data:", error);
				setError(error.response?.data?.message);
			}
		};
		fetchUserData();
	}, [userId, navigate]);

	return (
		<div className="border rounded-lg p-4 hover:border-[#D84418] transition-colors border-[#D84418]/30 w-full">
			{error && (
				<div className="text-red-500 mb-4 p-2 bg-red-100 rounded">
					{error}
				</div>
			)}
			{isEditing ? (
				<form
					onSubmit={handleSubmit}
					className="w-full">
					<div className="mb-3">
						<label className="block text-sm font-medium text-gray-400 mb-1">
							Name:
						<input
							type="text"
							name="name"
							id="name"
							value={userData.name}
							onChange={handleChange}
							className="p-2 block w-full rounded-md border border-gray-700 bg-gray-900 text-white shadow-sm focus:border-[#D84418] focus:ring focus:ring-[#D84418]/50 focus:ring-opacity-50"
							/>
							</label>
					</div>
					<div className="mb-3">
						<label className="block text-sm font-medium text-gray-400 mb-1">
							Email:
						<input
							type="email"
							name="email"
							id="email"
							value={userData.email}
							onChange={handleChange}
							className="p-2 block w-full rounded-md border border-gray-700 bg-gray-900 text-white shadow-sm focus:border-[#D84418] focus:ring focus:ring-[#D84418]/50 focus:ring-opacity-50"
							/>
							</label>
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-400 mb-1">
							Contact:
						<input
							type="text"
							name="contact"
							id="contact"
							value={userData.contact}
							onChange={handleChange}
							className="p-2 block w-full rounded-md border border-gray-700 bg-gray-900 text-white shadow-sm focus:border-[#D84418] focus:ring focus:ring-[#D84418]/50 focus:ring-opacity-50"
							/>
							</label>
					</div>
					<div className="flex justify-end space-x-2">
						<button
							type="button"
							onClick={handleCancel}
							className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
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
				<div className="w-full">
					<div className="flex justify-between items-center w-full">
						<div className="flex flex-col items-start">
							<h2 className="text-xl font-semibold text-white">
								{userData?.name || "Loading..."}
							</h2>
							<p className="text-gray-400 mt-1">
								{userData?.email || "Loading..."}
							</p>
							<p className="text-gray-400 mt-1">
								{userData?.contact || "Loading..."}
							</p>
						</div>
						<button
							type="button"
							onClick={handleEditClick}
							className="inline-flex items-center text-[#D84418] hover:text-[#FF6B6B] transition-colors">
							<Edit2
								size={18}
								className="mr-1"
							/>
							<span>Edit Profile</span>
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default EditableProfile;

EditableProfile.propTypes = {
	name: PropTypes.string,
	email: PropTypes.string,
	contact: PropTypes.string,
};
