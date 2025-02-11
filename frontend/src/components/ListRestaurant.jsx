import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ListRestaurant() {
  const [restaurants, setRestaurants] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get("http://localhost:3006/api/restaurants");
        setRestaurants(response.data.data);
        console.log("restaurants", response.data.data);
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message ||
          "An error occurred while fetching restaurants",
        );
        console.error(error);
      }
    };
    fetchRestaurant();
  }, []);

  return (
    <div>
      {restaurants.length > 0 ? (
        restaurants.map((restaurant) => (
          <div key={restaurant._id} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mb-4 mx-auto">
            <Link to={`/restaurants/${restaurant._id}`}>
              <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">{restaurant?.name}</h2>
            </Link>
            <p className="text-gray-700 mb-6">{restaurant?.location || "Location not available"}</p>
            <p className="text-gray-700 mb-6">{restaurant?.contact || "No contact info"}</p>

            {/* Images */}
            <div>
              {restaurant?.images?.length > 0 ? (
                restaurant.images.map((image, index) => (
                  <img key={index} src={image} alt={`${restaurant.name} - Image ${index + 1}`} className="w-full h-64 object-cover mb-4"/>
                ))
              ) : (
                <img src="" alt="No Image Available" className="w-full h-64 object-cover mb-4"/>
              )}
            </div>

            {/* Operating Hours */}
            <div className="text-gray-700 mb-4">
              <h3 className="font-bold">🕒 Operating Hours:</h3>
              {restaurant?.operatingHours ? (
                <ul>
                  {Object.entries(restaurant.operatingHours).map(([day, hours]) => (
                    <li key={day}>
                      <span className="font-semibold">{day.charAt(0).toUpperCase() + day.slice(1)}:</span> {hours || "Closed"}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Operating hours not available</p>
              )}
            </div>

            {/* Average Rating */}
            <p className="text-gray-700 mb-4">⭐ Average Rating: {restaurant?.averageRating ?? "No ratings yet"}</p>

            {/* Reviews */}
            <div className="text-center">
              {restaurant?.reviews?.length > 0 ? (
                <div>
                  <h3 className="text-xl font-bold text-gray-700 mb-4">Customer Reviews:</h3>
                  {restaurant.reviews.map((review) => (
                    <div key={review._id} className="mb-4">
                      <p className="text-gray-700 mb-2">Rating: {review.rating}</p>
                      <p className="text-gray-700 mb-2">Comments: {review.comment}</p>
                      <p className="text-gray-700 mb-2">Username: {review?.userName || "Anonymous"}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No reviews yet.</p>
              )}

              {/* Add Review Button */}
              <div className="text-red-600">
                <Link to={`/restaurants/${restaurant._id}/reviews`}>Add a review</Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-red-600">{errorMessage}</div>
      )}
    </div>
  );
}

export default ListRestaurant;

