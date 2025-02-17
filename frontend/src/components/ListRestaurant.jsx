import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ListRestaurant() {
  const [restaurants, setRestaurants] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/restaurants"
        );
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
                className="bg-neutral-800 p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:bg-neutral-950 duration-300 ease-in-out"
              >
                <Link to={`/restaurants/${restaurant._id}`}>
                  <h2 className="text-2xl font-bold text-red-300 text-center mb-4">
                    {restaurant?.name}
                  </h2>
                </Link>
                <p className="text-neutral-300 text-center">
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

                {/* Rating */}
                <p className="text-center text-yellow-500 font-semibold mt-4">
                  ⭐ {restaurant?.averageRating ?? "No ratings yet"}
                </p>

                {/* Operating Hours */}
                <div className="text-neutral-300 mt-4">
                  <h3 className="font-bold text-lg">🕒 Operating Hours:</h3>
                  {restaurant?.operatingHours ? (
                    <ul className="text-sm">
                      {Object.entries(restaurant.operatingHours).map(
                        ([day, hours]) => (
                          <li key={day}>
                            <span className="font-semibold">
                              {day.charAt(0).toUpperCase() + day.slice(1)}:
                            </span>{" "}
                            {hours || "Closed"}
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
                      <h3 className="text-lg font-bold text-neutral-300">
                        Customer Reviews:
                      </h3>
                      {restaurant.reviews.slice(0, 2).map((review) => (
                        <div
                          key={review._id}
                          className="bg-gray-100 p-3 rounded-lg mt-2"
                        >
                          <p className="text-gray-700">⭐ {review.rating}</p>
                          <p className="text-gray-600">{review.comment}</p>
                          <p className="text-gray-500 text-sm">
                            - {review?.userName || "Anonymous"}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No reviews yet.</p>
                  )}

                  {/* Add Review Button */}
                  <div className="text-center mt-4">
                    <Link
                      to={`/restaurants/${restaurant._id}/reviews`}
                      className="text-red-500 font-bold hover:underline"
                    >
                      Add a review
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
