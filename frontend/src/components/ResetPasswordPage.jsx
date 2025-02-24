import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/images/logo.png";

const ResetPasswordPage = () => {
	const { token } = useParams();
	const navigate = useNavigate();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");

	const handlePasswordReset = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		try {
			const response = await axios.post(
				`http://localhost:8000/api/auth/reset-password/${token}`,
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
		<div className="flex items-center justify-center min-h-screen bg-[#D84418]">
			<div className="bg-[#9a3412] p-8 rounded-lg shadow-lg w-full max-w-md">

				{/* Circular Logo */}
				<div className="flex justify-center mb-4">
					<img
						src={logo} // Change this path to your actual logo
						alt="Logo"
						className="w-24 h-24 object-cover rounded-full border-4 border-yellow-400 shadow-lg"
					/>
				</div>

				<h2 className="text-2xl font-bold text-center text-yellow-400 mb-6">
					Reset Your Password
				</h2>

				{message && (
					<p className="text-green-500 text-center mb-4">{message}</p>
				)}
				{error && (
					<p className="text-red-500 text-center mb-4">{error}</p>
				)}

				<form onSubmit={handlePasswordReset}>
					<div className="mb-4">
						<label className="block text-sm font-medium text-yellow-200">
							New Password
						</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="w-full p-3 mt-1 border border-orange-300 rounded-lg bg-[#c13915] 
							text-white outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
						/>
					</div>

					<div className="mb-6">
						<label className="block text-sm font-medium text-yellow-200">
							Confirm Password
						</label>
						<input
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
							className="w-full p-3 mt-1 border border-orange-300 rounded-lg bg-[#c13915] 
							text-white outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
						/>
					</div>

					<button
						type="submit"
						className="w-full bg-yellow-400 text-black py-3 rounded-lg hover:bg-yellow-500 
						transition-transform transform hover:scale-105"
					>
						Reset Password
					</button>
				</form>

				<p className="text-center text-sm text-yellow-200 mt-4">
					Remembered your password?{" "}
					<a
						href="/login"
						className="text-yellow-300 hover:text-yellow-400"
					>
						Login here
					</a>
				</p>
			</div>
		</div>
	);
};

export default ResetPasswordPage;
