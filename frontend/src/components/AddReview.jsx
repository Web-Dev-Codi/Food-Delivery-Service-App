import React from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function AddReview() {
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams(); // Get restaurantId from URL

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");
try{
    const token = localStorage.getItem("token");
    if (!token) {
    alert("You need to login first");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
      return;
    }
    const response = await axios.post(
      `http://localhost:3006/api/${id}/reviews`,{ rating, comment },
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
    console.log("reviewsubmitted", response.data);
  } catch (error) {
    setErrorMessage(error.response?.data?.message || "An error occurred while submitting the review");
    setSuccessMessage("");
    console.error(error);
  }
  setIsLoading(false);
}

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
        Add Review
      </h1>
      {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Rating
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            required
            min="1"
            max="5"
            onChange={(e) => setRating(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex justify-between">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Comment
          </label>
          <textarea
            id="comment"
            name="comment"
            required
            onChange={(e) => setComment(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full mt-4 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
          }`}
        >
        {isLoading ? "Submitting..." : "Add Review"}
        </button>
      </form>
    </div>
  );
}

export default AddReview;
