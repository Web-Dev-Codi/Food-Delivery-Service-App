/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ListRestaurant() {
  const [restaurants, setRestaurants] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/restaurants`);
        setRestaurants(response.data.data);
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message ||
            "An error occurred while fetching restaurants"
        );
      }
    };
    fetchRestaurant();
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Content Wrapper */}
      <div className="relative max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[87.5rem]">
        {/* Header */}
        <h1 className="text-center text-4xl font-extrabold bg-gradient-to-r from-yellow-400 to-red-500 inline-block text-transparent bg-clip-text mb-8">
          🍽️ Explore Restaurants
        </h1>

        {restaurants.length > 0 ? (
          <div className="relative grid gap-6 sm:grid-cols-1 md:grid-cols-2 md:gap-4 md:pb-[7rem]">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant._id}
                className="bg-black/30 p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:bg-black/50 duration-300 ease-in-out"
              >
                <Link to={`/restaurants/${restaurant._id}`}>
                  <h2 className="text-2xl font-extrabold text-[#FF5733] text-center mb-4">
                    {restaurant?.name}
                  </h2>
                </Link>
                <p className="text-neutral-300 text-center mb-2">
                  {restaurant?.location || "Location not available"}
                </p>
                <p className="text-neutral-300 text-center mb-4">
                  {restaurant?.contact || "No contact info"}
                </p>

                {/* Restaurant Image */}
                <div className="overflow-hidden rounded-lg bg-black ">
                  {restaurant?.images?.length > 0 ? (
                    <img
                      src={restaurant.images[0]}
                      alt={restaurant.name}
                      className="w-full h-48 object-cover rounded-lg z-10 "
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-300 flex items-center justify-center rounded-lg">
                      <span className="text-gray-500">No Image Available</span>
                    </div>
                  )}
                </div>

                {/* Average Star Rating */}
                <div className="flex justify-center items-center mt-4">
                  {/** Check the average rating if available */}
                  {restaurant?.averageRating ? (
                    <div className="flex items-center gap-2">
                      {/* Star Ratings */}
                      <div className="text-xs">
                        {Array.from(
                          { length: Math.floor(restaurant.averageRating) },
                          (_, i) => (
                            <span key={i}>⭐</span>
                          )
                        )}

                        {/* If the rating is in decimal show the half star */}
                        {restaurant.averageRating % 1 !== 0 && <span>⭐️</span>}
                      </div>

                      {/* Numeric Rating */}
                      <p className="text-neutral-300 text-sm font-semibold">
                        ({restaurant.averageRating.toFixed(1)})
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-500">No ratings yet</p>
                  )}
                </div>

                {/* Operating Hours */}
                <div className="text-neutral-100 font-semibold mt-4">
                  <h3 className="font-bold text-lg p-1">Operating Hours:</h3>
                  {restaurant?.operatingHours ? (
                    <ul className="text-sm">
                      {Object.entries(restaurant.operatingHours).map(
                        ([day, hours]) => (
                          <li key={day} className="p-1">
                            <span className="text-[#D84418] font-bold ">
                              {day.charAt(0).toUpperCase() + day.slice(1)}:
                            </span>{" "}
                            <span className=" text-neutral-100 font-semibold p-1">
                              {hours || "Closed"}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  ) : (
                    <p className="text-sm">Operating hours not available</p>
                  )}
                  {/* Gradient Backgrounds
									<GradientBgTl className="absolute top-0 left-0" />
									<GradientBgTr className="absolute top-0 right-0" />
                  */}
                </div>

                {/* Reviews Section */}
                <div className="mt-6">
                  {restaurant?.reviews?.length > 0 ? (
                    <div>
                      <h3 className="text-xl font-bold text-neutral-200 mb-3">
                        Customer Reviews
                      </h3>

                      {restaurant.reviews.slice(0, 2).map((review) => (
                        <div
                          key={review._id}
                          className="bg-black/40 p-4 rounded-lg mt-3 border border-gray-700 shadow-md hover:bg-black/80 transition duration-300"
                        >
                          {/* Star Rating */}
                          <div className="flex items-center mb-2">
                            {Array.from({ length: review.rating }, (_, i) => (
                              <span key={i} className="text-xs">
                                ⭐
                              </span>
                            ))}
                          </div>

                          {/* Review Text */}
                          <p className="text-neutral-300 font-medium">
                            {review.comment}
                          </p>

                          {/* Reviewer Info */}
                          <p className="text-neutral-300 text-sm mt-2">
                            - {review?.userName || "Anonymous"}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No reviews yet.</p>
                  )}

                  {/* Add Review Button */}
                  <div className="text-center mt-6">
                    <Link
                      to={`/restaurants/${restaurant._id}/reviews`}
                      className="bg-transparent text-neutral-300 font-semibold px-4 py-2 rounded-full hover:bg-green-700 transition duration-200"
                    >
                      Add a Review
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-red-600 text-xl font-semibold">
            {errorMessage}
          </div>
        )}
      </div>
    </section>
  );
}

export default ListRestaurant;
