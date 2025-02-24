/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import {
	User,
	MapPin,
	CreditCard,
	Clock,
	ShoppingBag,
	Heart,
	Settings,
	Gift,
	Star,
	Share2,
	HelpCircle,
	LogOut,
	ChevronRight,
	Edit2,
	Plus,
} from "lucide-react";

const UserProfile = () => {
	const [activeTab, setActiveTab] = useState("profile");

	// Mock data - would come from API in real app
	const userData = {
		name: "Alex Johnson",
		email: "alex.johnson@example.com",
		phone: "(555) 123-4567",
		profilePic: "/api/placeholder/80/80",
		addresses: [
			{
				id: 1,
				name: "Home",
				address: "123 Main St, Apt 4B, New York, NY 10001",
				isDefault: true,
			},
			{
				id: 2,
				name: "Work",
				address: "456 Business Ave, Suite 300, New York, NY 10002",
				isDefault: false,
			},
		],
		paymentMethods: [
			{ id: 1, type: "Visa", last4: "4242", isDefault: true },
			{ id: 2, type: "Mastercard", last4: "5678", isDefault: false },
		],
		activeOrders: [
			{
				id: 1001,
				restaurant: "Burger Palace",
				status: "On the way",
				estimatedDelivery: "12:45 PM",
				items: ["Double Cheeseburger", "Fries", "Soda"],
			},
		],
		orderHistory: [
			{
				id: 1000,
				restaurant: "Pizza Place",
				date: "Feb 20, 2025",
				total: "$24.99",
				items: ["Large Pepperoni Pizza", "Garlic Knots"],
			},
			{
				id: 999,
				restaurant: "Sushi Bar",
				date: "Feb 15, 2025",
				total: "$32.50",
				items: ["Dragon Roll", "Miso Soup", "Gyoza"],
			},
		],
		favorites: [
			{ id: 1, restaurant: "Burger Palace", item: "Double Cheeseburger" },
			{ id: 2, restaurant: "Pizza Place", item: "Large Pepperoni Pizza" },
			{ id: 3, restaurant: "Taco Spot", item: "Carne Asada Tacos" },
		],
		dietaryPreferences: ["Vegetarian options", "No nuts"],
		loyaltyPoints: 450,
	};

	return (
		<div className="max-w-lg mx-auto bg-gray-50 min-h-screen pb-20">
			{/* Header */}
			<div className="bg-white shadow-sm">
				<div className="p-4">
					<h1 className="text-2xl font-bold text-gray-800">
						Profile
					</h1>
				</div>
			</div>

			{/* Profile Header - Tier 1 */}
			<div className="bg-white p-4 mb-2 shadow-sm">
				<div className="flex items-center">
					<img
						src={userData.profilePic}
						alt="Profile"
						className="w-16 h-16 rounded-full object-cover mr-4"
					/>
					<div className="flex-1">
						<h2 className="text-xl font-semibold">
							{userData.name}
						</h2>
						<p className="text-gray-600">{userData.email}</p>
						<p className="text-gray-600">{userData.phone}</p>
					</div>
					<button className="p-2 text-gray-500 hover:text-gray-700">
						<Edit2 size={20} />
					</button>
				</div>
			</div>

			{/* Navigation Tabs */}
			<div className="bg-white flex border-b mb-2">
				<button
					className={`flex-1 py-3 font-medium ${
						activeTab === "profile"
							? "text-green-600 border-b-2 border-green-600"
							: "text-gray-500"
					}`}
					onClick={() => setActiveTab("profile")}>
					Profile
				</button>
				<button
					className={`flex-1 py-3 font-medium ${
						activeTab === "orders"
							? "text-green-600 border-b-2 border-green-600"
							: "text-gray-500"
					}`}
					onClick={() => setActiveTab("orders")}>
					Orders
				</button>
				<button
					className={`flex-1 py-3 font-medium ${
						activeTab === "settings"
							? "text-green-600 border-b-2 border-green-600"
							: "text-gray-500"
					}`}
					onClick={() => setActiveTab("settings")}>
					Settings
				</button>
			</div>

			{/* Profile Tab Content */}
			{activeTab === "profile" && (
				<div className="space-y-4">
					{/* Active Orders - Tier 1 */}
					{userData.activeOrders.length > 0 && (
						<div className="bg-white p-4 shadow-sm">
							<h3 className="text-lg font-semibold mb-3">
								Active Order
							</h3>
							{userData.activeOrders.map((order) => (
								<div
									key={order.id}
									className="border border-green-100 bg-green-50 rounded-lg p-3">
									<div className="flex justify-between items-center mb-2">
										<span className="font-medium">
											{order.restaurant}
										</span>
										<span className="text-green-600 text-sm font-medium">
											{order.status}
										</span>
									</div>
									<p className="text-sm text-gray-600 mb-1">
										Estimated arrival:{" "}
										{order.estimatedDelivery}
									</p>
									<p className="text-sm text-gray-600">
										{order.items.join(", ")}
									</p>
									<button className="mt-2 w-full bg-green-600 text-white py-2 rounded-lg font-medium">
										Track Order
									</button>
								</div>
							))}
						</div>
					)}

					{/* Addresses - Tier 1 */}
					<div className="bg-white p-4 shadow-sm">
						<div className="flex justify-between items-center mb-3">
							<h3 className="text-lg font-semibold">
								Delivery Addresses
							</h3>
							<button className="text-green-600">
								<Plus size={20} />
							</button>
						</div>
						{userData.addresses.map((address) => (
							<div
								key={address.id}
								className="border-b border-gray-100 py-2 last:border-0">
								<div className="flex justify-between">
									<div>
										<div className="flex items-center">
											<span className="font-medium">
												{address.name}
											</span>
											{address.isDefault && (
												<span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
													Default
												</span>
											)}
										</div>
										<p className="text-sm text-gray-600 mt-1">
											{address.address}
										</p>
									</div>
									<button className="text-gray-400">
										<Edit2 size={16} />
									</button>
								</div>
							</div>
						))}
					</div>

					{/* Payment Methods - Tier 1 */}
					<div className="bg-white p-4 shadow-sm">
						<div className="flex justify-between items-center mb-3">
							<h3 className="text-lg font-semibold">
								Payment Methods
							</h3>
							<button className="text-green-600">
								<Plus size={20} />
							</button>
						</div>
						{userData.paymentMethods.map((method) => (
							<div
								key={method.id}
								className="border-b border-gray-100 py-2 last:border-0">
								<div className="flex justify-between items-center">
									<div className="flex items-center">
										<div className="mr-3">
											{method.type === "Visa" ? (
												<div className="w-10 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center">
													VISA
												</div>
											) : (
												<div className="w-10 h-6 bg-red-500 rounded text-white text-xs flex items-center justify-center">
													MC
												</div>
											)}
										</div>
										<div>
											<div className="flex items-center">
												<span className="font-medium">
													{method.type} ••••{" "}
													{method.last4}
												</span>
												{method.isDefault && (
													<span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
														Default
													</span>
												)}
											</div>
										</div>
									</div>
									<button className="text-gray-400">
										<Edit2 size={16} />
									</button>
								</div>
							</div>
						))}
					</div>

					{/* Favorites - Tier 2 */}
					<div className="bg-white p-4 shadow-sm">
						<h3 className="text-lg font-semibold mb-3">
							Favorites
						</h3>
						{userData.favorites.map((fav) => (
							<div
								key={fav.id}
								className="border-b border-gray-100 py-2 last:border-0">
								<p className="font-medium">{fav.item}</p>
								<p className="text-sm text-gray-600">
									{fav.restaurant}
								</p>
							</div>
						))}
						<button className="mt-2 w-full border border-gray-300 text-gray-700 py-2 rounded-lg font-medium">
							See All Favorites
						</button>
					</div>

					{/* Dietary Preferences - Tier 2 */}
					<div className="bg-white p-4 shadow-sm">
						<div className="flex justify-between items-center mb-3">
							<h3 className="text-lg font-semibold">
								Dietary Preferences
							</h3>
							<button className="text-gray-400">
								<Edit2 size={16} />
							</button>
						</div>
						<div className="flex flex-wrap gap-2">
							{userData.dietaryPreferences.map((pref, index) => (
								<span
									key={index}
									className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
									{pref}
								</span>
							))}
						</div>
					</div>

					{/* Loyalty - Tier 2 */}
					<div className="bg-white p-4 shadow-sm">
						<h3 className="text-lg font-semibold mb-3">Rewards</h3>
						<div className="bg-gray-50 rounded-lg p-4 text-center">
							<div className="text-3xl font-bold text-green-600 mb-1">
								{userData.loyaltyPoints}
							</div>
							<div className="text-sm text-gray-600 mb-3">
								Reward Points
							</div>
							<div className="w-full bg-gray-200 rounded-full h-2.5">
								<div
									className="bg-green-600 h-2.5 rounded-full"
									style={{ width: "45%" }}></div>
							</div>
							<p className="mt-2 text-sm text-gray-600">
								50 more points until your next reward
							</p>
							<button className="mt-3 w-full bg-white border border-green-600 text-green-600 py-2 rounded-lg font-medium">
								View Rewards
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Orders Tab Content */}
			{activeTab === "orders" && (
				<div className="space-y-4">
					{/* Order History - Tier 1 */}
					<div className="bg-white p-4 shadow-sm">
						<h3 className="text-lg font-semibold mb-3">
							Order History
						</h3>
						{userData.orderHistory.map((order) => (
							<div
								key={order.id}
								className="border-b border-gray-100 py-3 last:border-0">
								<div className="flex justify-between mb-1">
									<span className="font-medium">
										{order.restaurant}
									</span>
									<span className="text-gray-600">
										{order.date}
									</span>
								</div>
								<p className="text-sm text-gray-600 mb-1">
									{order.items.join(", ")}
								</p>
								<div className="flex justify-between mt-2">
									<span className="text-gray-700">
										{order.total}
									</span>
									<button className="text-green-600 text-sm font-medium">
										Reorder
									</button>
								</div>
							</div>
						))}
						<button className="mt-2 w-full border border-gray-300 text-gray-700 py-2 rounded-lg font-medium">
							View All Orders
						</button>
					</div>
				</div>
			)}

			{/* Settings Tab Content */}
			{activeTab === "settings" && (
				<div className="space-y-4">
					{/* Account Settings - Tier 3 */}
					<div className="bg-white shadow-sm">
						<div className="p-4 border-b border-gray-100">
							<h3 className="text-lg font-semibold mb-2">
								Account Settings
							</h3>
						</div>
						<div className="divide-y divide-gray-100">
							<button className="w-full px-4 py-3 flex justify-between items-center">
								<div className="flex items-center">
									<User
										size={20}
										className="text-gray-500 mr-3"
									/>
									<span>Personal Information</span>
								</div>
								<ChevronRight
									size={18}
									className="text-gray-400"
								/>
							</button>
							<button className="w-full px-4 py-3 flex justify-between items-center">
								<div className="flex items-center">
									<Bell
										size={20}
										className="text-gray-500 mr-3"
									/>
									<span>Notifications</span>
								</div>
								<ChevronRight
									size={18}
									className="text-gray-400"
								/>
							</button>
							<button className="w-full px-4 py-3 flex justify-between items-center">
								<div className="flex items-center">
									<Share2
										size={20}
										className="text-gray-500 mr-3"
									/>
									<span>Refer Friends</span>
								</div>
								<ChevronRight
									size={18}
									className="text-gray-400"
								/>
							</button>
							<button className="w-full px-4 py-3 flex justify-between items-center">
								<div className="flex items-center">
									<HelpCircle
										size={20}
										className="text-gray-500 mr-3"
									/>
									<span>Help & Support</span>
								</div>
								<ChevronRight
									size={18}
									className="text-gray-400"
								/>
							</button>
							<button className="w-full px-4 py-3 flex justify-between items-center">
								<div className="flex items-center">
									<LogOut
										size={20}
										className="text-gray-500 mr-3"
									/>
									<span className="text-red-500">
										Log Out
									</span>
								</div>
							</button>
						</div>
					</div>

					{/* App Version - Tier 3 */}
					<div className="p-4 text-center text-gray-500 text-sm">
						<p>App Version 2.4.1</p>
					</div>
				</div>
			)}

			{/* Bottom Navigation */}
			<div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2">
				<button className="p-2 flex flex-col items-center">
					<Home
						size={24}
						className="text-gray-400"
					/>
					<span className="text-xs text-gray-500 mt-1">Home</span>
				</button>
				<button className="p-2 flex flex-col items-center">
					<Search
						size={24}
						className="text-gray-400"
					/>
					<span className="text-xs text-gray-500 mt-1">Search</span>
				</button>
				<button className="p-2 flex flex-col items-center">
					<ShoppingBag
						size={24}
						className="text-gray-400"
					/>
					<span className="text-xs text-gray-500 mt-1">Orders</span>
				</button>
				<button className="p-2 flex flex-col items-center">
					<User
						size={24}
						className="text-green-600"
					/>
					<span className="text-xs text-green-600 mt-1">Profile</span>
				</button>
			</div>
		</div>
	);
};

// Missing component definitions for proper compilation
const Bell = ({ size, className }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}>
			<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
			<path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
		</svg>
	);
};

const Home = ({ size, className }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}>
			<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
			<polyline points="9 22 9 12 15 12 15 22"></polyline>
		</svg>
	);
};

const Search = ({ size, className }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}>
			<circle
				cx="11"
				cy="11"
				r="8"></circle>
			<line
				x1="21"
				y1="21"
				x2="16.65"
				y2="16.65"></line>
		</svg>
	);
};

export default UserProfile;