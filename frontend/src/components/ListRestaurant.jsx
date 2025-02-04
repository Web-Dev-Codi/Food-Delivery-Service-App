import { useState, useEffect } from "react"; // Import React and hooks
import axios from "axios";
import { Link } from "react-router-dom";

function ListRestaurant() {
  // ✅ Move hooks inside the component
  const [restaurants, setRestaurants] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3006/api/restaurants",
        );
        setRestaurants(response.data.data); // Access the `data` field
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
          <div
            key={restaurant._id}
            className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mb-4 mx-auto">
            <Link to={`/restaurants/${restaurant._id}`}>
              <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
                {restaurant.name}
              </h2>
            </Link>
            <p className="text-gray-700 mb-6">{restaurant.location}</p>
            <p className="text-gray-700 mb-6">{restaurant.contact}</p>
            <div>
            {restaurant.images && restaurant.images.length > 0 ? (
              restaurant.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${restaurant.name} - Image ${index + 1}`}
                  className="w-full h-64 object-cover mb-4"
                />
              ))
            ) : (
              <div className="w-full h-64 bg-gray-300 mb-4">No images available</div>
            )}
          </div>
            <div className="text-center">
              {restaurant.reviews.length > 0 ? (
                <div>
                  <h3 className="text-xl font-bold text-gray-700 mb-4">
                    Reviews
                  </h3>
                  {restaurant.reviews.map((review) => (
                    <div key={review._id} className="mb-4">
                      <p className="text-gray-700 mb-2">{review.rating}</p>
                      <p className="text-gray-700 mb-2">{review.comment}</p>
                      <p className="text-gray-700 mb-2">{review.user}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-red-600">No reviews yet</div>
              )}
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
