/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
	FaShoppingCart,
	FaUser,
	FaRegWindowClose,
	FaUserCog,
	FaSearch,
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiLogOut } from "react-icons/bi";
import { CartContext } from "../../context/CartContext";
import axios from "axios";
import { Tooltip } from "react-tooltip";

const Header = () => {
	const navigate = useNavigate();
	const location = useLocation();
	// const { userId } = useParams();
	const { state } = useContext(CartContext);
	const [menuOpen, setMenuOpen] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
	const [userRole, setUserRole] = useState("");
	const dropdownRef = useRef(null);
	const searchRef = useRef(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [showSearchResults, setShowSearchResults] = useState(false);



	const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
	// Check authentication status whenever location changes
	useEffect(() => {
		const token = localStorage.getItem("token");
		const isNowLoggedIn = !!token;
		setIsLoggedIn(isNowLoggedIn);

		// If user is logged in, fetch their role
		if (isNowLoggedIn) {
			fetchUserRole();
		} else {
			setUserRole("");
		}
	}, [location.pathname]);

	// Fetch user role from the backend
	const fetchUserRole = async () => {
		try {
			const token = localStorage.getItem("token");
			const userId = localStorage.getItem("userId");

			if (!token || !userId) return;

			const response = await axios.get(
				`${API_URL}/data/users/${userId}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			if (response.data && response.data.data) {
				setUserRole(response.data.data.role);
			}
		} catch (error) {
			console.error("Error fetching user role:", error);
		}
	};

	// Handle clicks outside the dropdown and search results
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				setProfileDropdownOpen(false);
				setMenuOpen(false);
			}

			if (
				searchRef.current &&
				!searchRef.current.contains(event.target)
			) {
				setShowSearchResults(false);
			}
		};

		if (profileDropdownOpen || showSearchResults) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		if (menuOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		// Clean up the event listener
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [profileDropdownOpen, menuOpen, showSearchResults]);

	// Search functionality
	useEffect(() => {
		const fetchRestaurants = async () => {
			if (searchTerm.trim() === "") {
				setSearchResults([]);
				return;
			}

			try {
				const response = await axios.get(
					`${API_URL}/restaurants?search=${searchTerm}`
				);

				if (response.data && Array.isArray(response.data.data)) {
					setSearchResults(response.data.data);
				} else if (response.data && Array.isArray(response.data)) {
					setSearchResults(response.data);
				} else {
					setSearchResults([]);
				}
			} catch (error) {
				console.error("Error searching restaurants:", error);
				setSearchResults([]);
			}
		};

		// Debounce search requests
		const timer = setTimeout(() => {
			if (searchTerm) {
				fetchRestaurants();
			}
		}, 300);

		return () => clearTimeout(timer);
	}, [searchTerm]);

	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
		setShowSearchResults(e.target.value.trim() !== "");
	};

	const handleRestaurantClick = (restaurantId) => {
		setSearchTerm("");
		setShowSearchResults(false);
		navigate(`/restaurants/${restaurantId}`);
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("userId");
		setIsLoggedIn(false);
		setUserRole("");
		setProfileDropdownOpen(false);
		navigate("/login");
	};

	return (
		<header className="relative w-full top-0 z-50 bg-transparent backdrop-blur-sm">
			<nav className="container mx-auto px-4 py-3">
				<div className="flex items-center justify-between">
					<Link
						to="/"
						className="flex items-center">
						<span className="text-2xl font-extrabold text-orange-500">
							🍽️ FFE.
						</span>
					</Link>
					<div className="hidden md:flex items-center space-x-8">
						<Link
							to="/"
							className="font-bold text-white hover:text-orange-500 transition-colors">
							Home
						</Link>

						{location.pathname === "/" ? (
							<a
								href="#contact-section"
								className="font-bold text-white hover:text-orange-500 transition-colors cursor-pointer">
								Contact
							</a>
						) : (
							<Link
								to="/#contact-section"
								className="font-bold text-white hover:text-orange-500 transition-colors">
								Contact
							</Link>
						)}

						<Link
							to="/restaurants"
							className="font-bold text-white hover:text-orange-500 transition-colors">
							Resturants
						</Link>
						<Link
							to="/faqs"
							className="font-bold text-white hover:text-orange-500 transition-colors">
							FAQs
						</Link>
						{isLoggedIn && userRole === "admin" && (
							<Link
								to="/dashboard"
								className="font-bold text-orange-500 hover:text-orange-400 transition-colors flex items-center">
								<FaUserCog className="mr-1" />
								Admin
							</Link>
						)}

						{/* Search Component */}
						<div
							className="relative"
							ref={searchRef}>
							<div className="flex items-center bg-white bg-opacity-20  rounded-full px-3 py-1">
								<FaSearch className="text-orange-500 mr-2" />
								<input
									type="text"
									placeholder="Search restaurants..."
									className="bg-transparent text-white placeholder-gray-300 outline-none w-40"
									value={searchTerm}
									onChange={handleSearchChange}
								/>
							</div>

							{/* Search Results Dropdown - Only show when there are results and search term exists */}
							{showSearchResults && searchResults.length > 0 && (
								<div className="absolute mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-50 max-h-80 overflow-y-auto">
									{searchResults.map((restaurant) => (
										<div
											key={
												restaurant._id || restaurant.id
											}
											onClick={() =>
												handleRestaurantClick(
													restaurant._id ||
														restaurant.id
												)
											}
											className="px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 cursor-pointer">
											<div className="font-medium">
												{restaurant.name}
											</div>
										</div>
									))}
								</div>
							)}

							{showSearchResults &&
								searchTerm &&
								searchResults.length === 0 && (
									<div className="absolute mt-2 w-64 bg-white rounded-md shadow-lg py-2 z-50">
										<p className="px-4 text-sm text-gray-500">
											No restaurants found
										</p>
									</div>
								)}
						</div>
					</div>
					<div className="hidden md:flex items-center space-x-4">
						{isLoggedIn ? (
							<>
								{/* Shopping Cart - Only shown when logged in */}
								<Link
									to="/checkout"
									className="relative p-2">
									<FaShoppingCart className="text-white text-xl hover:text-orange-500 transition-colors" />
									{state.cart?.items?.length > 0 && (
										<span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
											{state.cart.items.length}
										</span>
									)}
								</Link>
								{/* User Avatar - Only shown when logged in */}
								<div
									className="relative"
									ref={dropdownRef}>
									<button
										onClick={() =>
											setProfileDropdownOpen(
												!profileDropdownOpen
											)
										}
										className="flex items-center space-x-2 focus:outline-none">
										<div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
											<FaUser className="text-white" />
										</div>
									</button>

									{/* Dropdown Menu */}
									{profileDropdownOpen && (
										<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
											<Link
												to={`/profile/${localStorage.getItem(
													"userId"
												)}`}
												className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50">
												<FaUser className="mr-3 text-orange-500" />
												My Profile
											</Link>
											{userRole === "admin" && (
												<Link
													to="/dashboard"
													className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50">
													<FaUserCog className="mr-3 text-orange-500" />
													Admin Dashboard
												</Link>
											)}
											<button
												onClick={handleLogout}
												className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-orange-50">
												<BiLogOut className="mr-3 text-orange-500" />
												Logout
											</button>

										</div>
									)}
								</div>
							</>
						) : (
							// Auth Buttons - Only shown when logged out
							<div className="flex items-center space-x-2">
								<Link
									to="/login"
									data-tooltip-id="admin-login-tooltip" // This connects the link to the tooltip
									className="px-4 py-2 text-white font-bold hover:text-orange-500 transition-colors">
									Sign In
								</Link>
								<Tooltip id="admin-login-tooltip" place="bottom" effect="solid">
								To Login as Admin use Email: "admin@ffe.com" | Password: "123456789"
							  </Tooltip>
								<Link
									to="/signup"
									className="px-4 py-2 bg-orange-500 text-white font-bold rounded-full hover:bg-white hover:text-orange-500 transition-colors">
									Sign Up
								</Link>
							</div>
						)}
					</div>
					<button
						onClick={() => setMenuOpen(!menuOpen)}
						className="md:hidden text-white hover:text-orange-500 transition-colors h-5 w-5">
						{menuOpen ? (
							<FaRegWindowClose style={{ fontSize: "26px" }} />
						) : (
							<GiHamburgerMenu style={{ fontSize: "26px" }} />
						)}
					</button>
				</div>
				{menuOpen && (
					<div
						className="md:hidden absolute top-full left-0 w-full bg-black bg-opacity-90 backdrop-blur-sm z-50"
						ref={dropdownRef}>
						<div className="flex flex-col space-y-4 p-4 z-50">
							<Link
								to="/"
								className="text-white font-bold hover:text-orange-500 transition-colors">
								Home
							</Link>
							<Link
								to="/menu"
								className="text-white font-bold hover:text-orange-500 transition-colors">
								Menu
							</Link>
							{location.pathname === "/" ? (
								<a
									href="#contact-section"
									className="text-white font-bold hover:text-orange-500 transition-colors cursor-pointer">
									Contact
								</a>
							) : (
								<Link
									to="/#contact-section"
									className="text-white font-bold hover:text-orange-500 transition-colors">
									Contact
								</Link>
							)}
							<Link
								to="/about-us"
								className="text-white font-bold hover:text-orange-500 transition-colors">
								AboutUs
							</Link>
							<Link
								to="/faqs"
								className="text-white font-bold hover:text-orange-500 transition-colors">
								FAQs
							</Link>
							{isLoggedIn ? (
								<div className="flex items-center space-x-4">
									<Link
										to="/checkout"
										className="text-white font-bold hover:text-orange-500 transition-colors">
										Cart ({state?.cart?.items?.length || 0})
									</Link>
									<Link
										to={`/profile/${localStorage.getItem(
											"userId"
										)}`}
										className="text-white font-bold hover:text-orange-500 transition-colors">
										Profile
									</Link>
								</div>
							) : (
								<div className="flex flex-col space-y-2">
									<Link
										to="/login"
										className="bg-transparent border border-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
										Login
									</Link>
									<Link
										to="/signup"
										className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
										Sign Up
									</Link>
								</div>
							)}
							{isLoggedIn && userRole === "admin" && (
								<Link
									to="/dashboard"
									className="text-orange-500 hover:text-orange-400 transition-colors flex items-center">
									<FaUserCog className="mr-1" />
									Admin Dashboard
								</Link>
							)}
						</div>
					</div>
				)}
			</nav>
		</header>
	);
};

export default Header;
