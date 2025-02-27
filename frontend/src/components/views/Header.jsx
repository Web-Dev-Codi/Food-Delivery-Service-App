import { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { FaShoppingCart, FaUser, FaRegWindowClose } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiLogOut } from "react-icons/bi";
import { CartContext } from "../../context/CartContext";

const Header = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { userId } = useParams();
	const { state } = useContext(CartContext);
	const [menuOpen, setMenuOpen] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
	const dropdownRef = useRef(null);

	// Check authentication status whenever location changes
	useEffect(() => {
		const token = localStorage.getItem("token");
		const isNowLoggedIn = !!token;
		setIsLoggedIn(isNowLoggedIn);
	}, [location.pathname]);

	// Handle clicks outside the dropdown
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				setProfileDropdownOpen(false);
				setMenuOpen(false);
			}
		};

		// Add event listener when the dropdown is open
		if (profileDropdownOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}
		// Add event listener when the dropdown is open
		if (menuOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		// Clean up the event listener
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [profileDropdownOpen, menuOpen]);

	const handleLogout = () => {
		localStorage.removeItem("token");
		setIsLoggedIn(false);
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
						<Link
							to="/menu"
							className="font-bold text-white hover:text-orange-500 transition-colors">
							Menu
						</Link>
						<Link
							to="/contact-us"
							className="font-bold text-white hover:text-orange-500 transition-colors">
							Contact
						</Link>
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
												to={`/profile/${userId}`}
												className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50">
												<FaUser className="mr-3 text-orange-500" />
												My Profile
											</Link>
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
									className="px-4 py-2 text-white font-bold hover:text-orange-500 transition-colors">
									Sign In
								</Link>
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
							<Link
								to="/contact-us"
								className="text-white font-bold hover:text-orange-500 transition-colors">
								Contact
							</Link>
							<Link
								to="/about"
								className="text-white font-bold hover:text-orange-500 transition-colors">
								About Us
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
										to="/profile"
										className="text-white font-bold hover:text-orange-500 transition-colors">
										Profile
									</Link>
								</div>
							) : (
								<div className="flex flex-col space-y-2">
									<Link
										to="/login"
										className="font-bold text-white hover:text-orange-500 transition-colors">
										Login
									</Link>
									<Link
										to="/signup"
										className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
										Sign Up
									</Link>
								</div>
							)}
						</div>
					</div>
				)}
			</nav>
		</header>
	);
};

export default Header;
