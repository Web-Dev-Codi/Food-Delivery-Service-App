/* eslint-disable react/no-unescaped-entities */
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
import logo from "../../assets/images/logo.png";
import { Tooltip } from "react-tooltip";
import { jwtDecode } from "jwt-decode";

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

	// Function to check if token is expired
	const isTokenExpired = (token) => {
		if (!token) return true;

		try {
			const decoded = jwtDecode(token);
			const currentTime = Date.now() / 1000;

			// Check if token is expired
			if (decoded.exp < currentTime) {
				return true;
			}
			return false;
		} catch (error) {
			console.error("Error decoding token:", error);
			return true;
		}
	};

	// Check authentication status whenever location changes or periodically
	useEffect(() => {
		const checkAuthStatus = () => {
			const token = localStorage.getItem("token");

			// If token doesn't exist or is expired, log the user out
			if (!token || isTokenExpired(token)) {
				if (token && isTokenExpired(token)) {
					// If token exists but is expired, remove it
					localStorage.removeItem("token");
					localStorage.removeItem("userId");
				}
				setIsLoggedIn(false);
				setUserRole("");
			} else {
				setIsLoggedIn(true);
				fetchUserRole();
			}
		};

		// Check auth status immediately
		checkAuthStatus();

		// Also set up an interval to check periodically (every minute)
		const intervalId = setInterval(checkAuthStatus, 60000);

		// Clean up interval on component unmount
		return () => clearInterval(intervalId);
	}, [location.pathname]);

	// Fetch user role from the backend
	const fetchUserRole = async () => {
		try {
			const token = localStorage.getItem("token");
			const userId = localStorage.getItem("userId");

			if (!token || !userId || isTokenExpired(token)) return;

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
			// If we get a 401 Unauthorized error, the token is likely invalid or expired
			if (error.response && error.response.status === 401) {
				localStorage.removeItem("token");
				localStorage.removeItem("userId");
				setIsLoggedIn(false);
				setUserRole("");
			}
		}
	};

	// Handle clicks outside the dropdown and search results
	useEffect(() => {
		const handleClickOutside = (event) => {
			// console.log("Clicked element:", event.target); // Debugging
			// console.log("Search Ref:", searchRef.current); // Debugging
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
	// Search functionality using getRestaurantByName controller
	useEffect(() => {
		const fetchRestaurantByName = async () => {
			if (searchTerm.trim() === "") {
				setSearchResults(null);
				setShowSearchResults(false);
				return;
			}

			try {
				const response = await axios.get(
					`${API_URL}/api/restaurants/name/${searchTerm
						.trim()
						.toLowerCase()}`
				);
				console.log("Response from search restaurant:", response);

				if (response.data && response.data.data.length > 0) {
					setSearchResults(response.data.data); // Store as an object
					setShowSearchResults(true);
				} else {
					setSearchResults([]);
					setShowSearchResults(false);
				}
			} catch (error) {
				console.error("Error fetching restaurant:", error);
				setSearchResults([]);
				setShowSearchResults(false);
			}
		};

		const timer = setTimeout(() => {
			if (searchTerm) {
				fetchRestaurantByName();
			}
		}, 300);

		return () => clearTimeout(timer);
	}, [searchTerm]);

	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
		setShowSearchResults(e.target.value.trim() !== "");
	};
	useEffect(() => {
		setShowSearchResults(searchResults !== null);
	}, [searchResults]);

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
						className="flex items-center text-2xl font-extrabold text-orange-500">
						<span className="flex flex-row gap-2 items-center">
							<img
								src={logo} // Change this path to your actual logo
								alt="Logo"
								className="w-10 h-10 object-cover rounded-full border-2 border-yellow-400 shadow-lg"
							/>
							FFE.
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

							{/* Search Results Dropdown - Show when results exist */}
							{showSearchResults && searchResults.length > 0 && (
								<div className="absolute mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-[9999] max-h-80 overflow-y-auto border border-gray-300">
									{searchResults.map((restaurant) => (
										<div
											key={restaurant._id}
											className="p-2 hover:bg-gray-100 cursor-pointer"
											onClick={() =>
												handleRestaurantClick(
													restaurant._id
												)
											}>
											<h3 className="text-lg font-semibold text-black">
												{restaurant.name}
											</h3>
											<p className="text-sm text-gray-500">
												{restaurant.location}
											</p>
										</div>
									))}
								</div>
							)}

							{/* Show "No restaurant found" when search returns no results */}
							{showSearchResults &&
								searchResults.length === 0 && (
									<div className="absolute mt-2 w-64 bg-white rounded-md shadow-lg py-2 z-50">
										<p className="px-4 text-sm text-gray-500">
											No restaurant found
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
								<Tooltip
									id="admin-login-tooltip"
									place="bottom"
									effect="solid">
									To Login as Admin use Email: "admin@ffe.com"
									| Password: "123456789"
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
								to="/restaurants"
								className="text-white font-bold hover:text-orange-500 transition-colors">
								Resturant
							</Link>
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
								<div className="flex flex-col space-y-4">
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
									<button
										onClick={handleLogout}
										className="bg-orange-500 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600 transition-colors flex items-center">
										<BiLogOut className="mr-2" />
										Logout
									</button>
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
