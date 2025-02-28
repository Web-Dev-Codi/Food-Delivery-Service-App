import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import logo from "../assets/images/logo.png";
import reviewAnimation from "../assets/animations/reviewAnimation.json";
import Lottie from "lottie-react";

function AddReview() {
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [rating, setRating] = useState("");
	const [comment, setComment] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { id } = useParams();

	const handleSubmit = async (e) => {
		e.preventDefault();

		setIsLoading(true);
		setSuccessMessage("");
		setErrorMessage("");
		try {
			const token = localStorage.getItem("token");
			if (!token) {
				alert("You need to login first");
				setTimeout(() => {
					window.location.href = "/login";
				}, 2000);
				return;
			}
			const response = await axios.post(
				`http://localhost:8000/api/${id}/reviews`,
				{ rating, comment },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setSuccessMessage(response.data.message);
			alert("Thank you for your review");
			setErrorMessage("");
			setRating("");
			setComment("");
			console.log("review submitted", response.data);
		} catch (error) {
			setErrorMessage(
				error.response?.data?.message ||
					"An error occurred while submitting the review"
			);
			setSuccessMessage("");
			console.error(error);
		}
		setIsLoading(false);
	};

	return (
		<div className="min-h-screen flex items-center justify-center px-4 sm:px-8 md:px-12 bg-black/40 backdrop-blur-lg">
			<div className="flex flex-col lg:flex-row w-full max-w-5xl shadow-xl rounded-2xl overflow-hidden">
				{/* Form Section */}
				<div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-12 bg-black/40">
					<div className="w-full max-w-md"> {/* Slightly wider form container */}
						<div className="flex justify-center mb-6">
							<img
								src={logo}
								alt="Logo"
								className="h-20 w-20 rounded-full border-4 border-yellow-500 shadow-xl transform hover:scale-110 transition duration-300"
							/>
						</div>
						
						<p className="text-yellow-400 text-center mb-6">
						We’d love to hear from you  share your thoughts on your experience with us.
						</p>

						{successMessage && (
							<p className="text-green-500 text-center mb-4">
								{successMessage}
							</p>
						)}
						{errorMessage && (
							<p className="text-red-500 text-center mb-4">
								{errorMessage}
							</p>
						)}

						<form onSubmit={handleSubmit} className="space-y-6 w-full">
							{/* Rating Field */}
							<div className="mb-4">
								<label className="block text-xl font-medium text-white-800">
									Rating
								</label>
								<input
									type="number"
									id="rating"
									name="rating"
									required
									min="1"
									max="5"
									step="0.1"
									value={rating}
									onChange={(e) => setRating(e.target.value)}
									className="w-full px-4 py-3 border-2 border-white rounded-lg  text-white outline-none focus:ring-2 focus:ring-white-400 focus:border-white-400"
									placeholder="Rate from 1 to 5"
								/>
							</div>

							{/* Comment Field */}
							<div className="mb-6">
								<label className="block text-xl font-medium text-white-400">
									Comment
								</label>
								<textarea
									id="comment"
									name="comment"
									required
									rows="5"
									value={comment}
									onChange={(e) => setComment(e.target.value)}
									className="w-full px-4 py-3 border-2 border-white rounded-lg  text-white outline-none focus:ring-2 focus:ring-white-400 focus:border-white-400"
									placeholder="Write your review here..."
								/>
							</div>

							<button
								type="submit"
								disabled={isLoading}
								className="w-full py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-transform transform hover:scale-105"
							>
								{isLoading ? "Submitting..." : "Add Review"}
							</button>
						</form>
					</div>
				</div>

				{/* Animation Section - Smaller size */}
				<aside className="flex items-center justify-center bg-black/30 p-4 lg:w-1/3 hidden lg:flex">
					<div className="w-64 h-64">
						<Lottie
							animationData={reviewAnimation}
							loop
							autoPlay
							className="w-full h-full"
						/>
					</div>
				</aside>
			</div>
		</div>
	);
}

export default AddReview;
