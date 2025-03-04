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

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post("http://localhost:8000/data/create", {
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
		<div className="min-h-screen flex items-center justify-center px-4 sm:px-8 md:px-12 bg-black/40 backdrop-blur-lg">
			<div className="flex flex-col lg:flex-row w-full max-w-7xl shadow-xl rounded-2xl overflow-hidden">
				<div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16 bg-black/40">
					<div className="w-full max-w-7xl">
						<div className="flex justify-center mb-6">
							<img
								src={logo}
								alt="Logo"
								className="h-20 w-20 rounded-full border-4 border-yellow-500 shadow-xl transform hover:scale-110 transition duration-300"
							/>
						</div>
						<h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-6">
							Join the Community!
						</h2>

						{successMessage && (
							<div className="mb-4 text-green-600">
								{successMessage}
							</div>
						)}
						{errorMessage && (
							<div className="mb-4 text-red-600">
								{errorMessage}
							</div>
						)}

						<form
							className="space-y-6"
							onSubmit={handleSubmit}>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
								{/* Full Name Field */}
								<div>
									<label className="text-white block mb-2">
										Full Name
									</label>
									<input
										type="text"
										placeholder="Full Name"
										required
										className="input-field w-full h-12 rounded-lg px-4 border border-white focus:border-white focus:ring-2 focus:ring-white"
										value={name}
										onChange={(e) =>
											setName(e.target.value)
										}
									/>
								</div>

								{/* Email Field */}
								<div>
									<label className="text-white block mb-2">
										Email
									</label>
									<input
										type="email"
										placeholder="Email"
										required
										className="input-field w-full h-12 rounded-lg px-4 border border-white focus:border-white focus:ring-2 focus:ring-white"
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
									/>
								</div>

								{/* Contact Number Field */}
								<div>
									<label className="text-white block mb-2">
										Contact Number
									</label>
									<input
										type="text"
										placeholder="Contact Number"
										required
										className="input-field w-full h-12 rounded-lg px-4 border border-white focus:border-white focus:ring-2 focus:ring-white"
										value={contact}
										onChange={(e) =>
											setContact(e.target.value)
										}
									/>
								</div>

								{/* Street Address Field */}
								<div>
									<label className="text-white block mb-2">
										Street Address
									</label>
									<input
										type="text"
										placeholder="Street Address"
										required
										className="input-field w-full h-12 rounded-lg px-4 border border-white focus:border-white focus:ring-2 focus:ring-white"
										value={street}
										onChange={(e) =>
											setStreet(e.target.value)
										}
									/>
								</div>

								{/* City Field */}
								<div>
									<label className="text-white block mb-2">
										City
									</label>
									<input
										type="text"
										placeholder="City"
										required
										className="input-field w-full h-12 rounded-lg px-4 border border-white focus:border-white focus:ring-2 focus:ring-white"
										value={city}
										onChange={(e) =>
											setCity(e.target.value)
										}
									/>
								</div>

								{/* Zip Code Field */}
								<div>
									<label className="text-white block mb-2">
										Zip Code
									</label>
									<input
										type="text"
										placeholder="Zip Code"
										required
										className="input-field w-full h-12 rounded-lg px-4 border border-white focus:border-white focus:ring-2 focus:ring-white"
										value={zipCode}
										onChange={(e) =>
											setZipCode(e.target.value)
										}
									/>
								</div>
							</div>

							{/* Password Field */}
							<div className="relative">
								<label className="text-white block mb-2">
									Password
								</label>
								<input
									type={showPassword ? "text" : "password"}
									placeholder="Password"
									required
									className="input-field w-full h-12 rounded-lg px-4 pr-10 border border-white focus:border-white focus:ring-2 focus:ring-white "
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
								<span
									className="absolute right-3 top-12 cursor-pointer text-white focus:border-white focus:ring-2 focus:ring-white"
									onClick={() =>
										setShowPassword(!showPassword)
									}>
									{showPassword ? <FaEyeSlash /> : <FaEye />}
								</span>
							</div>

							{/* Remember Me */}
							<div className="flex items-center space-x-2">
								<input
									type="checkbox"
									checked={rememberMe}
									onChange={() => setRememberMe(!rememberMe)}
									className="h-4 w-4"
								/>
								<label className="text-white text-sm">
									Remember Me
								</label>
							</div>

							{/* Sign Up Button */}
							<button
								type="submit"
								className="w-full py-3 bg-[#f97316] text-black rounded-xl hover:bg-yellow-600 transition duration-300">
								Sign Up
							</button>

							{/* Login Link */}
							<p className="text-center mt-4 text-white">
								Already have an account?{" "}
								<button
									type="button"
									className="text-yellow-200 hover:underline"
									onClick={() => navigate("/login")}>
									Login
								</button>
							</p>
						</form>
					</div>
				</div>
				<aside className="relative block h-full lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
					<Lottie
						animationData={foodBoy1}
						loop={true}
						autoPlay={true}
						className="w-full h-full hidden md:block"
					/>
				</aside>
			</div>
		</div>
	);
}

export default SignupForm;
