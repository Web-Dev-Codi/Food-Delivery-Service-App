import axios from "axios";
import Lottie from "lottie-react"; // Import Lottie
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import foodBoy1 from "../assets/animations/foodBoy1.json"; // Import animation
import logo from "../assets/images/logo.png";

const ResetPasswordPage = () => {
	const { token } = useParams();
	const navigate = useNavigate();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");

	const VITE_FRONTEND_URL =
		import.meta.env.VITE_FRONTEND_URL || "http://localhost:8000";

	const handlePasswordReset = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		try {
			const response = await axios.post(
				`${VITE_FRONTEND_URL}/auth/reset-password/${token}`,
				{ password }
			);

			setMessage(response.data.message);
			setError("");
			setTimeout(() => navigate("/login"), 3000);
		} catch (err) {
			setError(
				err.response?.data?.message ||
					"Something went wrong. Please try again."
			);
			setMessage("");
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-black/40">
			<div className="lg:grid lg:min-h-screen lg:grid-cols-12 w-full px-4 md:px-8">
				{/* Left side animation */}
				<aside className="relative block h-64 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
					<Lottie
						animationData={foodBoy1} // Animation data
						loop={true}
						autoPlay={true}
						className="w-full h-full hidden md:block"
					/>
				</aside>

				{/* Right side form */}
				<main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
					<div className="max-w-xl lg:max-w-3xl w-full">
						{/* Logo Section */}
						<div className="flex justify-center mb-4">
							<img
								src={logo} // Change this path to your actual logo
								alt="Logo"
								className="w-24 h-24 object-cover rounded-full border-4 border-yellow-400 shadow-lg"
							/>
						</div>

						<h2 className="text-2xl font-bold text-center text-white-400 mb-6">
							Reset Your Password
						</h2>

						{message && (
							<p className="text-green-500 text-center mb-4">
								{message}
							</p>
						)}
						{error && (
							<p className="text-red-500 text-center mb-4">
								{error}
							</p>
						)}

						<form onSubmit={handlePasswordReset}>
							<div className="mb-4">
								<label className="block text-sm font-medium text-white-200">
									New Password
									<input
										type="password"
										value={password}
										onChange={(e) =>
											setPassword(e.target.value)
										}
										required
										className="w-full p-3 mt-1 border border-white-300 rounded-lg bg-black/40
                  text-white outline-none focus:ring-2 focus:ring-white-400 focus:border-white-400"
									/>
								</label>
							</div>

							<div className="mb-6">
								<label className="block text-sm font-medium text-white-200">
									Confirm Password
									<input
										type="password"
										value={confirmPassword}
										onChange={(e) =>
											setConfirmPassword(e.target.value)
										}
										required
										className="w-full p-3 mt-1 border border-white-300 rounded-lg bg-black/40
                  text-white outline-none focus:ring-2 focus:ring-white-400 focus:border-white-400"
									/>
								</label>
							</div>

							<button
								type="submit"
								className="w-full bg-orange-400 text-black py-3 rounded-lg hover:bg-yellow-500
                transition-transform transform hover:scale-105">
								Reset Password
							</button>
						</form>

						<p className="text-center text-sm text-yellow-200 mt-4">
							Remembered your password?{" "}
							<a
								href="/login"
								className="text-yellow-300 hover:text-yellow-400">
								Login here
							</a>
						</p>
					</div>
				</main>
			</div>
		</div>
	);
};

export default ResetPasswordPage;
