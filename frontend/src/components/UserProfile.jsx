import { useState } from "react";
import {
	User,
	MapPin,
	// CreditCard,
	// Clock,
	// ShoppingBag,
	// Heart,
	// Settings,
	// Gift,
	// Star,
	Bell,
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
		name: "Brian Cordisco",
		email: "brian.cordisco@example.com",
		phone: "(555) 123-4567",
		profilePic: "https://placehold.co/600x400",
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
		<div className="max-w-4xl mx-auto bg-black/40 backdrop-blur-lg rounded-lg shadow-lg p-4 min-h-screen pb-20 sm:pb-24 lg:pb-32 border-1 border-black">
			{/* Header */}
			<div className="bg-[#D84418] shadow-md rounded-t-lg">
				<div className="px-4 py-6 sm:px-6 lg:px-8">
					<h1 className="text-2xl font-bold text-white">Profile</h1>
				</div>
			</div>

			{/* Profile Header - Tier 1 */}
			<div className="p-4 sm:p-6 lg:p-8 border-b border-[#D84418]/30">
				<div className="flex flex-col sm:flex-row items-center">
					<img
						src={userData.profilePic}
						alt="Profile"
						className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mb-4 sm:mb-0 sm:mr-6 border-2 border-[#D84418]"
					/>
					<div className="flex-1 text-center sm:text-left">
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
							<div>
								<h2 className="text-xl font-semibold text-white">
									{userData.name}
								</h2>
								<p className="text-gray-400 mt-1">
									{userData.email}
								</p>
								<p className="text-gray-400 mt-1">
									{userData.phone}
								</p>
							</div>
							<button className="mt-3 sm:mt-0 inline-flex items-center text-[#D84418] hover:text-[#FF6B6B] transition-colors">
								<Edit2
									size={18}
									className="mr-1"
								/>
								<span>Edit Profile</span>
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Navigation Tabs */}
			<div className="flex space-x-4 p-4 border-b border-[#D84418]/30">
				<button
					onClick={() => setActiveTab("profile")}
					className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
						activeTab === "profile"
							? "bg-[#D84418] text-white"
							: "text-gray-400 hover:text-white"
					}`}>
					Profile
				</button>
				<button
					onClick={() => setActiveTab("orders")}
					className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
						activeTab === "orders"
							? "bg-[#D84418] text-white"
							: "text-gray-400 hover:text-white"
					}`}>
					Orders
				</button>
				<button
					onClick={() => setActiveTab("settings")}
					className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
						activeTab === "settings"
							? "bg-[#D84418] text-white"
							: "text-gray-400 hover:text-white"
					}`}>
					Settings
				</button>
			</div>

			{/* Active Orders Section */}
			{userData.activeOrders.length > 0 && (
				<div className=" p-4 sm:p-6 lg:p-8 border-b border-[#D84418]/30">
					<div className="space-y-4">
						{userData.activeOrders.map((order) => (
							<div
								key={order.id}
								className="bg-[#1A1A1A] rounded-lg p-4 sm:p-6 border border-[#D84418]/30">
								<div className="flex items-center justify-between mb-3">
									<h3 className="text-lg font-semibold text-white">
										{order.restaurant}
									</h3>
									<span className="text-[#D84418] bg-[#FF6B6B]/20 px-3 py-1 rounded-full text-sm">
										{order.status}
									</span>
								</div>
								<p className="text-gray-400 mb-2">
									Estimated arrival: {order.estimatedDelivery}
								</p>
								<p className="text-gray-400">
									{order.items.join(", ")}
								</p>
								<button className="mt-4 w-full sm:w-auto bg-[#D84418] text-white py-2 px-6 rounded-lg hover:bg-[#FF6B6B] transition-colors">
									Track Order
								</button>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Addresses Section */}
			<div className=" sm:p-6 lg:p-8 border-b border-[#D84418]/30">
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-lg font-semibold text-white">
						Delivery Addresses
					</h3>
					<button className="text-[#D84418] hover:text-[#FF6B6B] transition-colors inline-flex items-center">
						<Plus
							size={18}
							className="mr-1"
						/>
						Add New
					</button>
				</div>
				<div className="space-y-4">
					{userData.addresses.map((address) => (
						<div
							key={address.id}
							className="border rounded-lg p-4 hover:border-[#D84418] transition-colors border-[#D84418]/30">
							<div className="flex justify-between items-start">
								<div className="flex items-start space-x-3">
									<MapPin
										className="text-[#D84418] mt-1"
										size={20}
									/>
									<div>
										<h4 className="font-medium text-white">
											{address.name}
										</h4>
										<p className="text-gray-400 text-sm">
											{address.address}
										</p>
									</div>
								</div>
								<button className="text-[#D84418] hover:text-[#FF6B6B] transition-colors">
									<Edit2 size={18} />
								</button>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Loyalty Points Section */}
			<div className=" p-4 sm:p-6 lg:p-8">
				<div className="bg-[#1A1A1A] p-6 rounded-2xl border-2 border-[#D84418] transform transition-all duration-300 hover:border-opacity-80 hover:shadow-[0_0_15px_rgba(216,68,24,0.3)]">
					<h3 className="text-xl font-semibold text-white mb-2">
						Reward Points
					</h3>
					<div className="flex items-center justify-between">
						<p className="text-4xl font-bold bg-gradient-to-r from-[#D84418] to-[#FF6B6B] bg-clip-text text-transparent">
							{userData.loyaltyPoints}
						</p>
						<button className="px-4 py-2 bg-[#D84418] text-white rounded-lg hover:opacity-90 transition-opacity">
							View Rewards
						</button>
					</div>
				</div>
			</div>

			{/* Profile Tab Content */}
			{activeTab === "profile" && (
				<div className="space-y-4">
					{/* Favorites - Tier 2 */}
					<div className=" p-4 sm:p-6 lg:p-8 border-b border-[#D84418]/30">
						<h3 className="text-lg font-semibold text-white mb-3">
							Favorites
						</h3>
						{userData.favorites.map((fav) => (
							<div
								key={fav.id}
								className="border-b border-gray-100 py-2 last:border-0">
								<p className="font-medium text-white">
									{fav.item}
								</p>
								<p className="text-sm text-gray-400">
									{fav.restaurant}
								</p>
							</div>
						))}
						<button className="mt-2 w-full border border-gray-300 text-gray-400 py-2 rounded-lg font-medium">
							See All Favorites
						</button>
					</div>

					{/* Dietary Preferences - Tier 2 */}
					<div className=" p-4 sm:p-6 lg:p-8 border-b border-[#D84418]/30">
						<div className="flex justify-between items-center mb-3">
							<h3 className="text-lg font-semibold text-white">
								Dietary Preferences
							</h3>
							<button className="text-gray-400">
								<Edit2
									size={16}
									className="text-[#D84418]"
								/>
							</button>
						</div>
						<div className="flex flex-wrap gap-2">
							{userData.dietaryPreferences.map((pref, index) => (
								<span
									key={index}
									className="bg-gray-100 text-black px-3 py-1 rounded-full text-sm">
									{pref}
								</span>
							))}
						</div>
					</div>
				</div>
			)}

			{/* Orders Tab Content */}
			{activeTab === "orders" && (
				<div className="space-y-4">
					{/* Order History - Tier 1 */}
					<div className=" p-4 sm:p-6 lg:p-8 border-b border-[#D84418]/30">
						<h3 className="text-lg font-semibold text-white mb-3">
							Order History
						</h3>
						{userData.orderHistory.map((order) => (
							<div
								key={order.id}
								className="border-b border-gray-100 py-3 last:border-0">
								<div className="flex justify-between mb-1">
									<span className="font-medium text-white">
										{order.restaurant}
									</span>
									<span className="text-gray-400">
										{order.date}
									</span>
								</div>
								<p className="text-sm text-gray-400 mb-1">
									{order.items.join(", ")}
								</p>
								<div className="flex justify-between mt-2">
									<span className="text-gray-400">
										{order.total}
									</span>
									<button className="text-green-600 text-sm font-medium">
										Reorder
									</button>
								</div>
							</div>
						))}
						<button className="mt-2 w-full border border-gray-300 text-gray-400 py-2 rounded-lg font-medium">
							View All Orders
						</button>
					</div>
				</div>
			)}

			{/* Settings Tab Content */}
			{activeTab === "settings" && (
				<div className="space-y-4">
					{/* Account Settings - Tier 3 */}
					<div className="bg-[#1A1A1A] p-4 border border-[#D84418]/30 rounded-lg shadow-sm">
						<div className="p-4 border-b border-gray-100">
							<h3 className="text-lg font-semibold text-white mb-2">
								Account Settings
							</h3>
						</div>
						<div className="divide-y divide-gray-100">
							<button className="w-full px-4 py-3 flex justify-between items-center">
								<div className="flex items-center">
									<User
										size={20}
										className="text-gray-400 mr-3"
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
										className="text-gray-400 mr-3"
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
										className="text-gray-400 mr-3"
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
										className="text-gray-400 mr-3"
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
										className="text-gray-400 mr-3"
									/>
									<span className="text-red-500">
										Log Out
									</span>
								</div>
							</button>
						</div>
					</div>

					{/* App Version - Tier 3 */}
					<div className="p-4 text-center text-gray-400 text-sm">
						<p>Web App Version 2.4.1</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default UserProfile;
