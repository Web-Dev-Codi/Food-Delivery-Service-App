import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
	const { token } = useParams();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

	useEffect(() => {
		if (message || errorMessage) {
			const timer = setTimeout(() => {
				setMessage("");
				setErrorMessage("");
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [message, errorMessage]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setErrorMessage("Passwords do not match");
			return;
		}

		setLoading(true); // Start loading

		try {
			const response = await axios.post(
				`${API_URL}/auth/reset-password/${token}`, //  Correct API URL
				{ password }
			);
			setMessage(response.data.message);
			setErrorMessage("");
			setTimeout(() => navigate("/login"), 3000);
		} catch (err) {
			console.error(
				"Reset password error details:",
				err.response?.data || err
			);
			setErrorMessage(
				err.response?.data?.message ||
					"Something went wrong. Please try again."
			);
			setMessage("");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-[#D84418]">
			<form
				onSubmit={handleSubmit}
				className="bg-[#9a3412] p-8 rounded-lg shadow-lg w-full max-w-md"
			>
				<h2 className="text-2xl font-bold text-center text-yellow-400 mb-6">
					Reset Password
				</h2>
				{message && (
					<p className="text-green-500 text-center mb-4">{message}</p>
				)}
				{errorMessage && (
					<p className="text-red-500 text-center mb-4">
						{errorMessage}
					</p>
				)}
				<div className="mb-4">
					<label className="block text-sm font-medium text-yellow-200">
						New Password
					</label>
					<input
						type="password"
						className="w-full px-4 py-2 border border-orange-300 rounded-lg bg-[#c13915]
							text-white outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<div className="mb-6">
					<label className="block text-sm font-medium text-yellow-200">
						Confirm Password
					</label>
					<input
						type="password"
						className="w-full px-4 py-2 border border-orange-300 rounded-lg bg-[#c13915]
							text-white outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</div>
				<button
					type="submit"
					className="w-full py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-transform transform hover:scale-105"
					disabled={loading}
				>
					{loading ? "Resetting..." : "Reset Password"}
				</button>
			</form>
		</div>
	);
}

export default ResetPassword;