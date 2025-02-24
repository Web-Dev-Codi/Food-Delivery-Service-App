import { useState } from "react";
import axios from "axios";
import logo from "../assets/images/logo.png"; // ✅ Import logo (if inside src/assets)

function ForgotPassword() {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"http://localhost:8000/api/auth/forgot-password",
				{ email }
			);
			setMessage(response.data.message);
			setErrorMessage("");
		} catch (err) {
			console.error("Forgot password error details:", err);
			setErrorMessage(
				err.response?.data?.message ||
					"Something went wrong. Please try again."
			);
			setMessage("");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-[#D84418]">
			<form
				onSubmit={handleSubmit}
				className="bg-[#9a3412] p-8 rounded-lg shadow-lg w-full max-w-md"
			>
				{/* Circular Logo Image */}
				<div className="flex justify-center mb-4">
					<img
						src= {logo} // Update with your actual logo path
						alt="Logo"
						className="w-24 h-24 object-cover rounded-full border-4 border-yellow-400 shadow-lg"
					/>
				</div>

				<h2 className="text-2xl font-bold text-center text-yellow-400 mb-6">
					Forgot Password
				</h2>

				{message && (
					<p className="text-green-500 text-center mb-4">{message}</p>
				)}
				{errorMessage && (
					<p className="text-red-500 text-center mb-4">{errorMessage}</p>
				)}

				<div className="mb-4">
					<label className="block text-sm font-medium text-yellow-200">
						Email
					</label>
					<input
						type="email"
						className="w-full px-4 py-2 border border-orange-300 rounded-lg bg-[#c13915] 
							text-white outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>

				<button
					type="submit"
					className="w-full py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-transform transform hover:scale-105"
				>
					Send Reset Link
				</button>
			</form>
		</div>
	);
}

export default ForgotPassword;