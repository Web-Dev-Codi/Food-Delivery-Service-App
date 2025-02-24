/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// I will eventually break this component into multiple components with smaller functions and states.

export default function UserProfile() {
	// const { id } = useParams();
	const [profileImage, setProfileImage] = useState(null);
	// const [userData, setUserData] = useState({
	// 	firstName: "",
	// 	lastName: "",
	// 	street: "",
	// 	streetNumber: "",
	// 	city: "",
	// 	country: "",
	// });

	// useEffect(() => {
	// 	const fetchUserData = async () => {
	// 		try {
	// 			const token = localStorage.getItem("token");
	// 			if (!token) {
	// 				return;
	// 			}

	// 			// Get the user's details including address
	// 			const response = await axios.get(
	// 				`http://localhost:8000/data/users/${id}`,
	// 				{
	// 					headers: {
	// 						Authorization: `Bearer ${token}`,
	// 					},
	// 				}
	// 			);

	// 			setUserData(response.data.data);
	// 		} catch (error) {
	// 			console.error("Error fetching user data:", error);
	// 		}
	// 	};

	// 	fetchUserData();
	// }, []);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (!file) {
			return;
		}
		const reader = new FileReader();
		reader.onloadend = () => {
			setProfileImage(reader.result);
		};
		reader.readAsDataURL(file);
	};

	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className=" bg-black/40 backdrop-blur-lg border border-[#D84418]/40 rounded-xl shadow-lg p-6 sm:px-6 lg:px-8">
				<div className="max-w-3xl mx-auto">
					<div className="relative rounded-xl bg-gradient-to-r from-blue-400 to-purple-500 p-8 text-center text-white">
						<div className="flex flex-col items-center justify-center">
							<div className="relative mb-4">
								<div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white overflow-hidden">
									{profileImage ? (
										<img
											src={profileImage}
											alt="Profile"
											className="w-full h-full object-cover"
										/>
									) : (
										<div className="w-full h-full flex items-center justify-center bg-gray-100">
											<span className="text-gray-400 text-3xl">
												👤
											</span>
										</div>
									)}
								</div>
							</div>
							<h2 className="text-2xl font-semibold mb-1">
								John Doe
							</h2>
						</div>
					</div>
					<div className="mt-20 bg-white rounded-xl shadow p-8 text-slate-950">
						{/* User Profile Section */}
						<div className="flex flex-col md:grid md:grid-cols-2 md:gap-x-8">
							<div className="w-full mb-4 md:mb-0">
								<div className="flex items-center gap-2 mb-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-5 h-5 text-blue-600">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
										/>
									</svg>
									<h2 className="text-lg font-semibold text-slate-950">
										User Profile
									</h2>
								</div>
								<p className="text-gray-600 text-sm mb-6">
									Your account&apos;s vital info. Only your
									username and photo will be visible to our
									driver.
								</p>
							</div>

							<div className="w-full">
								<div className="mb-6">
									<label className="block text-sm mb-2 text-slate-950">
										Photo
									</label>
									<div className="flex items-center gap-3">
										<div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="w-6 h-6 text-gray-400">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
												/>
											</svg>
										</div>
										<label className="px-4 py-2 bg-[#D84418] text-white rounded-md text-sm hover:bg-blue-700 transition-colors">
											Choose File
											<input
												type="file"
												id="profile-image"
												className="hidden"
												accept="image/*"
												onChange={handleImageChange}
											/>
										</label>
										<span className="text-sm text-gray-500">
											No file chosen
										</span>
									</div>
								</div>
							</div>

							<div className="col-span-2 space-y-4 text-slate-950">
								<div>
									<label className="block text-sm mb-2">
										Username
										<input
											type="text"
											placeholder="john.doe"
											className="w-full px-4 py-2 rounded-md border bg-white border-gray-300 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none text-sm"
										/>
									</label>
								</div>

								<div>
									<label className="block text-sm mb-2">
										Name
										<input
											type="text"
											placeholder="John Doe"
											className="w-full px-4 py-2 rounded-md border bg-white border-gray-300 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none text-sm"
										/>
									</label>
								</div>

								<div>
									<label className="block text-sm mb-2">
										Email
										<input
											type="email"
											placeholder="john.doe@example.com"
											className="w-full px-4 py-2 rounded-md border bg-white border-gray-300 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none text-sm"
										/>
									</label>
								</div>

								<div className="pt-4">
									<button className="px-4 py-2 bg-[#D84418] text-white rounded-md text-sm hover:bg-[#c13915] transition-colors">
										Update Profile
									</button>
								</div>
							</div>
						</div>

						{/* Password Change Section */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mt-8 pt-8 border-t">
							<div className="col-span-1">
								<div className="flex items-center gap-2 mb-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-5 h-5 text-blue-600">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
										/>
									</svg>
									<h2 className="text-lg font-semibold">
										Change Password
									</h2>
								</div>
								<p className="text-gray-600 text-sm">
									Changing your sign in password is an easy
									way to keep your account secure.
								</p>
							</div>

							<div className="col-span-1 space-y-4">
								<div>
									<label className="block text-sm mb-2">
										Current Password
										<input
											type="password"
											className="w-full px-4 py-2 rounded-md border bg-white border-gray-300 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none text-sm"
										/>
									</label>
								</div>

								<div>
									<label className="block text-sm mb-2">
										New Password
										<input
											type="password"
											className="w-full px-4 py-2 rounded-md border bg-white border-gray-300 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none text-sm"
										/>
									</label>
								</div>

								<div>
									<label className="block text-sm mb-2">
										Confirm Password
										<input
											type="password"
											className="w-full px-4 py-2 rounded-md border bg-white border-gray-300 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none text-sm"
										/>
									</label>
								</div>

								<div className="pt-4">
									<button className="px-4 py-2 bg-[#D84418] text-white rounded-md text-sm hover:bg-[#c13915] transition-colors">
										Update Password
									</button>
								</div>
							</div>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mt-8 pt-8 border-t">
							<div className="col-span-1">
								<div className="flex items-center gap-2 mb-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-5 h-5 text-blue-600">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
										/>
									</svg>
									<h2 className="text-lg font-semibold">
										Update Delivery Address
									</h2>
								</div>
								<p className="text-gray-600 text-sm">
									Your billing information is never shown to
									other users and only used for food delivery
									purposes.
								</p>
							</div>

							<div className="col-span-1 space-y-4">
								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="block text-sm mb-2">
											Firstname
											<input
												type="text"
												className="w-full px-4 py-2 rounded-md border bg-white border-gray-300 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none text-sm"
											/>
										</label>
									</div>
									<div>
										<label className="block text-sm mb-2">
											Lastname
											<input
												type="text"
												className="w-full px-4 py-2 rounded-md border bg-white border-gray-300 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none text-sm"
											/>
										</label>
									</div>
								</div>

								<div>
									<label className="block text-sm mb-2">
										Street Name
										<input
											type="text"
											className="w-full px-4 py-2 rounded-md border bg-white border-gray-300 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none text-sm"
										/>
									</label>
								</div>

								<div>
									<label className="block text-sm mb-2">
										Street Number
										<input
											type="text"
											className="w-full px-4 py-2 rounded-md border bg-white border-gray-300 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none text-sm"
										/>
									</label>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="block text-sm mb-2">
											City
											<input
												type="text"
												className="w-full px-4 py-2 rounded-md border bg-white border-gray-300 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none text-sm"
											/>
										</label>
									</div>
									<div>
										<label className="block text-sm mb-2">
											Postal
											<input
												type="text"
												className="w-full px-4 py-2 rounded-md border bg-white border-gray-300 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none text-sm"
											/>
										</label>
									</div>
								</div>
								<div className="pt-2">
									<button className="px-4 py-2 bg-[#D84418] text-white rounded-md text-sm hover:bg-[#c13915] transition-colors">
										Save Changes
									</button>
								</div>
							</div>

							{/* User Details Section */}
							{/* <div className="mt-8 p-6 bg-gray-50 rounded-lg">
								<h3 className="text-xl font-semibold mb-4">
									Current Delivery Details
								</h3>
								<div className="space-y-4">
									<div className="grid grid-cols-2 gap-4">
										<div>
											<p className="text-gray-600">
												First Name
											</p>
											<p className="font-medium">
												{userData.name || "Not set"}
											</p>
										</div>
									</div>
									<div>
										<p className="text-gray-600">
											Street Address
										</p>
										<p className="font-medium">
											{userData.address.street}{" "}
										</p>
									</div>
									<div className="grid grid-cols-2 gap-4">
										<div>
											<p className="text-gray-600">
												City
											</p>
											<p className="font-medium">
												{userData.address.city ||
													"Not set"}
											</p>
										</div>
									</div>
								</div>
							</div> */}
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mt-8 pt-8 border-t">
							<div className="col-span-1">
								<div className="flex items-center gap-2 mb-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-5 h-5 text-blue-600">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
										/>
									</svg>
									<h2 className="text-lg font-semibold">
										Notifications
									</h2>
								</div>
								<p className="text-gray-600 text-sm">
									You have complete control over the
									notifications you receive from us.
								</p>
							</div>
							<div className="col-span-1 space-y-6">
								<div className="space-y-3">
									<h3 className="text-base">
										Email Preferences
									</h3>
									<div className="space-y-3">
										<label className="flex items-center gap-2">
											<input
												type="checkbox"
												className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
												defaultChecked
											/>
											<span className="text-sm text-gray-700">
												Account related
											</span>
										</label>
										<label className="flex items-center gap-2">
											<input
												type="checkbox"
												className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
												defaultChecked
											/>
											<span className="text-sm text-gray-700">
												Product announcements
											</span>
										</label>
										<label className="flex items-center gap-2">
											<input
												type="checkbox"
												className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
												defaultChecked
											/>
											<span className="text-sm text-gray-700">
												News and promotions
											</span>
										</label>
									</div>
								</div>

								<div className="space-y-3">
									<h3 className="text-base">
										Push Notifications
									</h3>
									<div className="flex items-center gap-4">
										<label className="flex items-center gap-2">
											<input
												type="radio"
												name="pushNotification"
												className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
												defaultChecked
											/>
											<span className="text-sm text-gray-700">
												Enable
											</span>
										</label>
										<label className="flex items-center gap-2">
											<input
												type="radio"
												name="pushNotification"
												className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
											/>
											<span className="text-sm text-gray-700">
												Disable
											</span>
										</label>
									</div>
								</div>

								<div className="pt-2">
									<button className="px-4 py-2 bg-[#D84418] text-white rounded-md text-sm hover:bg-[#c13915] transition-colors">
										Update Preferences
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
