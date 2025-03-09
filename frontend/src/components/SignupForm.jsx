import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../assets/images/logo.png";
import foodBoy1 from "../assets/animations/foodBoy1.json";
import Lottie from "lottie-react";

function SignupForm() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [contact, setContact] = useState("");
	const [street, setStreet] = useState("");
	const [city, setCity] = useState("");
	const [zipCode, setZipCode] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(`${API_URL}/data/create`, {
				name,
				email,
				contact,
				address: { street, city, zipCode },
				password,
			});
			localStorage.setItem("token", res.data.token);
			if (rememberMe) {
				localStorage.setItem(
					"rememberMe",
					JSON.stringify({ email, password })
				);
			}
			setSuccessMessage(res.data.message);
			setErrorMessage("");
			setTimeout(() => navigate("/login"), 2000);
		} catch (err) {
			setErrorMessage(err.response?.data?.message || "Signup failed");
			setSuccessMessage("");
		}
	};

	return (
		<div
			className="min-h-screen flex items-center justify-center px-4 sm:px-8 md:px-12 bg-black/40 backdrop-blur-lg"
			role="main">
			<div className="flex flex-col lg:flex-row w-full max-w-7xl shadow-xl rounded-2xl overflow-hidden">
				<div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16 bg-black/40">
					<div className="w-full max-w-7xl">
						<div className="flex justify-center mb-6">
							<img
								src={logo}
								alt="Food Delivery Service Logo"
								className="h-20 w-20 rounded-full border-4 border-yellow-500 shadow-xl transform hover:scale-110 transition duration-300"
							/>
						</div>
						<h2
							className="text-2xl sm:text-3xl font-bold text-center text-white mb-6"
							id="signup-heading">
							Join the Community!
						</h2>

						{successMessage && (
							<div
								className="mb-4 text-green-600"
								role="status"
								aria-live="polite">
								{successMessage}
							</div>
						)}
						{errorMessage && (
							<div
								className="mb-4 text-red-600"
								role="alert">
								{errorMessage}
							</div>
						)}

						<form
							className="space-y-6"
							onSubmit={handleSubmit}
							aria-labelledby="signup-heading">
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
								{/* Full Name Field */}
								<div>
									<label
										htmlFor="fullname"
										className="text-white block mb-2">
										Full Name
									</label>
									<input
										id="fullname"
										type="text"
										placeholder="Full Name"
										required
										className="input-field w-full h-12 rounded-lg px-4 border border-white focus:border-white focus:ring-2 focus:ring-white"
										value={name}
										onChange={(e) =>
											setName(e.target.value)
										}
										aria-required="true"
									/>
								</div>

								{/* Email Field */}
								<div>
									<label
										htmlFor="email"
										className="text-white block mb-2">
										Email
									</label>
									<input
										id="email"
										type="email"
										placeholder="Email"
										required
										className="input-field w-full h-12 rounded-lg px-4 border border-white focus:border-white focus:ring-2 focus:ring-white"
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
										aria-required="true"
									/>
								</div>

								{/* Contact Number Field */}
								<div>
									<label
										htmlFor="contact"
										className="text-white block mb-2">
										Contact Number
									</label>
									<input
										id="contact"
										type="text"
										placeholder="Contact Number"
										required
										className="input-field w-full h-12 rounded-lg px-4 border border-white focus:border-white focus:ring-2 focus:ring-white"
										value={contact}
										onChange={(e) =>
											setContact(e.target.value)
										}
										aria-required="true"
									/>
								</div>

								{/* Street Address Field */}
								<div>
									<label
										htmlFor="street"
										className="text-white block mb-2">
										Street Address
									</label>
									<input
										id="street"
										type="text"
										placeholder="Street Address"
										required
										className="input-field w-full h-12 rounded-lg px-4 border border-white focus:border-white focus:ring-2 focus:ring-white"
										value={street}
										onChange={(e) =>
											setStreet(e.target.value)
										}
										aria-required="true"
									/>
								</div>

								{/* City Field */}
								<div>
									<label
										htmlFor="city"
										className="text-white block mb-2">
										City
									</label>
									<input
										id="city"
										type="text"
										placeholder="City"
										required
										className="input-field w-full h-12 rounded-lg px-4 border border-white focus:border-white focus:ring-2 focus:ring-white"
										value={city}
										onChange={(e) =>
											setCity(e.target.value)
										}
										aria-required="true"
									/>
								</div>

								{/* Zip Code Field */}
								<div>
									<label
										htmlFor="zipcode"
										className="text-white block mb-2">
										Zip Code
									</label>
									<input
										id="zipcode"
										type="text"
										placeholder="Zip Code"
										required
										className="input-field w-full h-12 rounded-lg px-4 border border-white focus:border-white focus:ring-2 focus:ring-white"
										value={zipCode}
										onChange={(e) =>
											setZipCode(e.target.value)
										}
										aria-required="true"
									/>
								</div>
							</div>

							{/* Password Field */}
							<div className="relative">
								<label
									htmlFor="password"
									className="text-white block mb-2">
									Password
								</label>
								<input
									id="password"
									type={showPassword ? "text" : "password"}
									placeholder="Password"
									required
									className="input-field w-full h-12 rounded-lg px-4 pr-10 border border-white focus:border-white focus:ring-2 focus:ring-white"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									aria-required="true"
								/>
								<button
									type="button"
									className="absolute right-3 top-12 cursor-pointer text-white focus:outline-none focus:ring-2 focus:ring-white rounded-full p-1"
									onClick={() =>
										setShowPassword(!showPassword)
									}
									aria-label={
										showPassword
											? "Hide password"
											: "Show password"
									}>
									{showPassword ? (
										<FaEyeSlash aria-hidden="true" />
									) : (
										<FaEye aria-hidden="true" />
									)}
								</button>
							</div>

							{/* Remember Me Checkbox */}
							<div className="flex items-center">
								<input
									id="remember-me"
									type="checkbox"
									className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
									checked={rememberMe}
									onChange={() => setRememberMe(!rememberMe)}
								/>
								<label
									htmlFor="remember-me"
									className="ml-2 block text-sm text-white">
									Remember me
								</label>
							</div>

							<button
								type="submit"
								className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-black">
								Sign Up
							</button>

							<p className="text-center text-white">
								Already have an account?{" "}
								<button
									type="button"
									onClick={() => navigate("/login")}
									className="text-yellow-500 hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded px-2 py-1">
									Log in
								</button>
							</p>
						</form>
					</div>
				</div>
				<div className="hidden lg:block lg:flex-1">
					<Lottie
						animationData={foodBoy1}
						loop={true}
						autoPlay={true}
						className="w-full h-full"
						aria-hidden="true"
					/>
				</div>
			</div>
		</div>
	);
}

export default SignupForm;
