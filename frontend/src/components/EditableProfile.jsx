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
        throw new Error("No authentication token found");
      }

      const res = await axios.put(
        `http://localhost:8000/data/update/${userId}`,
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
					`http://localhost:8000/data/users/${userId}`,
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
		<div className="">
			{isEditing ? (
				<form
					onSubmit={handleSubmit}
					className="">
					<label className="block text-sm font-medium text-gray-700">
						Name:
					</label>
					<input
						type="text"
						name="name"
						id="name"
						value={userData.name}
            onChange={handleChange}
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
					/>
					<label className="block text-sm font-medium text-gray-700">
						Email:
					</label>
					<input
						type="email"
						name="email"
						id="email"
						value={userData.email}
            onChange={handleChange}
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"

					/>
					<label className="block text-sm font-medium text-gray-700">
						Contact:
					</label>
					<input
						type="text"
						name="contact"
						id="contact"
						value={userData.contact}
						onChange={handleChange}
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
					/>
					<div className="flex justify-end space-x-2">
						<button
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
				<div className="">
					<div className="flex justify-between items-center">
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
							onClick={handleEditClick}
							className="mt-3 sm:mt-0 inline-flex items- text-[#D84418] hover:text-[#FF6B6B] transition-colors">
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
