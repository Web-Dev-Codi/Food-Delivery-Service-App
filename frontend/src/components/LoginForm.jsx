import axios from "axios";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import { useNavigate } from "react-router-dom";
//import ffe1 from "../assets/images/ffe1.jpg"; // Import your food image
import foodBoy1 from "../assets/animations/foodBoy1.json";
import logo from "../assets/images/logo.png"; // Import your logo

function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

	const navigate = useNavigate();

	useEffect(() => {
		const savedEmail = localStorage.getItem("email");
		const savedPassword = localStorage.getItem("password");
		if (savedEmail && savedPassword) {
			setEmail(savedEmail);
			setPassword(savedPassword);
			setRememberMe(true);
		}
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(`${API_URL}/data/login`, {
				email,
				password,
			});
			localStorage.setItem("token", res.data.token);
			localStorage.setItem("userId", res.data.data._id);
			setSuccessMessage(res.data.message);
			setErrorMessage("");

			if (rememberMe) {
				localStorage.setItem("email", email);
				localStorage.setItem("password", password);
			} else {
				localStorage.removeItem("email");
				localStorage.removeItem("password");
			}

			if (res.data.data.role === "admin") {
				navigate("/dashboard");
			} else {
				navigate("/");
			}
		} catch (err) {
			setErrorMessage(err.response?.data?.message || "Login failed");
			setSuccessMessage("");
		}
	};

	return (
		<section
			className="bg-black/40 backdrop-blur-lg"
			aria-labelledby="login-heading">
			<div className="lg:grid lg:min-h-screen lg:grid-cols-12">
				<aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
					{
						<Lottie
							animationData={foodBoy1}
							loop={true}
							autoPlay={true}
							className="w-full h-full hidden md:block"
							aria-hidden="true"
						/>
					}
				</aside>
				<main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
					<div className="max-w-xl lg:max-w-3xl">
						{/* Logo Section */}
						<div className="flex justify-center mb-4">
							<img
								src={logo}
								alt="Four Flavours Express Logo"
								className="h-24 w-24 rounded-full border-4 border-[#F97316] shadow-xl transform hover:scale-110 transition duration-300"
							/>
						</div>

						<h2
							id="login-heading"
							className="text-3xl font-bold text-center text-white mb-6">
							Welcome to Four Flavours Express!
						</h2>

						{successMessage && (
							<output
								className="mb-4 text-green-600"
								aria-live="polite">
								{successMessage}
							</output>
						)}
						{errorMessage && (
							<div
								className="mb-4 text-red-600"
								role="alert">
								{errorMessage}
							</div>
						)}

						<form
							className="bg-black/80 backdrop-blur-lg p-10 rounded-2xl shadow-xl w-full"
							onSubmit={handleSubmit}
							aria-labelledby="login-heading">
							<div className="mb-4">
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-300">
									Email
								</label>
								<input
									id="email"
									type="email"
									required
									className="w-full px-4 py-3 border border-[hsl(24,33%,97%)] rounded-xl bg-black/40
                  text-white outline-none focus:ring-2 focus:ring-[rgb(231,228,225)] focus:border-[rgb(250,248,246)]"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									aria-required="true"
									aria-describedby={
										errorMessage ? "login-error" : undefined
									}
								/>
							</div>

							<div className="mb-4 relative">
								<label
									htmlFor="password"
									className="block text-sm font-medium text-gray-300">
									Password
								</label>
								<input
									id="password"
									type={showPassword ? "text" : "password"}
									required
									className="w-full px-4 py-3 border border-[hsl(26,23%,94%)] rounded-xl bg-black/40
                  text-white outline-none focus:ring-2 focus:ring-[rgb(241,239,237)] focus:border-[rgb(252,251,250)] pr-10"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									aria-required="true"
								/>
								<button
									type="button"
									className="absolute right-3 top-9 cursor-pointer text-white focus:outline-none focus:ring-2 focus:ring-[#F97316] rounded-full p-1"
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

							<div className="flex justify-between items-center mb-4">
								<div className="flex items-center">
									<input
										id="remember-me"
										type="checkbox"
										checked={rememberMe}
										onChange={() =>
											setRememberMe(!rememberMe)
										}
										className="mr-2 custom-checkbox"
									/>
									<label
										htmlFor="remember-me"
										className="text-sm text-white">
										Remember Me
									</label>
								</div>

								<button
									type="button"
									className="text-sm text-white hover:underline focus:outline-none focus:ring-2 focus:ring-[#F97316] rounded px-2 py-1"
									onClick={() =>
										navigate("/forgot-password")
									}>
									Forgot Password?
								</button>
							</div>

							<button
								type="submit"
								className="w-full py-3 bg-[#f97316] text-white rounded-xl hover:bg-orange-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:ring-offset-2 focus:ring-offset-black">
								Login
							</button>

							<p className="text-center mt-4 text-white">
								Don&apos;t have an account?{" "}
								<button
									type="button"
									className="text-[#F97316] hover:underline focus:outline-none focus:ring-2 focus:ring-[#F97316] rounded px-2 py-1"
									onClick={() => navigate("/signup")}>
									Sign up
								</button>
							</p>
						</form>
					</div>
				</main>
			</div>
		</section>
	);
}

export default LoginForm;
