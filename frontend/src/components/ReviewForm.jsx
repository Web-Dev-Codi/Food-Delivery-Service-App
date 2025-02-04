/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";

function ReviewForm({ restaurantId }) {
	const [rating, setRating] = useState("");
	const [comment, setComment] = useState("");
	const [successMessage, setSuccessMessage] = useState(""); // State for success message
	const [errorMessage, setErrorMessage] = useState(""); // State for error message

	const handleSubmit = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem("token");
		if (!token) {
			setTimeout(() => {
				window.location.href = "/login";
			}, 2000);
			return;
		}

		try {
			const response = await axios.post(
				`http://localhost:8000/data/${restaurantId}/review`,
				{ rating, comment },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setSuccessMessage(response.data.message);
			setErrorMessage("");
			setRating("");
			setComment("");
			console.log("reviewsubmitted", response.data);
		} catch (error) {
			setErrorMessage(error.response.data.message);
			setSuccessMessage("");
			console.error(error);
		}
	};

	return (
		<div>
			<form
				className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
				onSubmit={handleSubmit}>
				<h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
					Review
				</h2>
				{/* Display Success or Error Messages */}
				{successMessage && (
					<div className="mb-4 text-green-600">{successMessage}</div>
				)}
				{errorMessage && (
					<div className="mb-4 text-red-600">{errorMessage}</div>
				)}

				<div className="mb-4">
					<label
						htmlFor="rating"
						className="block text-sm font-medium text-gray-600">
						Rating
					</label>
					<input
						type="number"
						id="rating"
						name="rating"
						required
						min="1"
						max="5"
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={rating}
						onChange={(e) => setRating(e.target.value)}
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="comment"
						className="block text-sm font-medium text-gray-600">
						Comment
					</label>
					<input
						type="text"
						id="comment"
						name="comment"
						required
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={comment}
						onChange={(e) => setComment(e.target.value)}
					/>
				</div>

				<button
					type="submit"
					className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
					Submit
				</button>
			</form>
		</div>
	);
}

export default ReviewForm;
