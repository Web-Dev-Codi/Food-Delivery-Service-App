import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function SingleRestaurant() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3006/api/restaurants/${id}`,
        );
        setRestaurant(response.data.data);
      } catch (error) {
        setErrorMessage(
          error.response?.data?.data.message ||
            "An error occurred while fetching the restaurant details",
        );
        console.error(error);
      }
      setLoading(false); // Set loading to false after fetching
    };
    fetchRestaurant();
  }, [id]);
  if (loading) {
    return <div>Loading...</div>; // Show a loading message while fetching data
  }

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
        {restaurant.name}
      </h2>
      <p className="text-gray-700 mb-6">{restaurant.location}</p>
      <p className="text-gray-700 mb-6">{restaurant.contact}</p>
      <div>
        {restaurant.images && restaurant.images.length > 0 ? (
          <img
            src={restaurant.images[0]}
            alt={restaurant.name}
            className="w-full h-64 object-cover mb-4"
          />
        ) : (
          <div className="w-full h-64 bg-gray-300 mb-4"></div>
        )}
      </div>
      <div className="text-center">
        {restaurant.reviews && restaurant.reviews.length > 0 ? (
          <div>
            <h3 className="text-xl font-bold text-gray-700 mb-4">Reviews</h3>
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
  );
}

export default SingleRestaurant;
