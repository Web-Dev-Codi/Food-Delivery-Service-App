import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function SingleRestaurant() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchRestaurant = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3006/api/restaurants/${id}`
        );
        setRestaurant(response.data.data);

        const menuResponse = await axios.get(
          `http://localhost:3006/food/menu/restaurant/${id}`
        );
        setMenus(menuResponse.data.data);
      } catch (error) {
        const errorMessage =
          error.response?.data?.data?.message ||
          "An error occurred while fetching the restaurant details";
        setErrorMessage(errorMessage);
        console.error(error);
      }
      setLoading(false);
    };
    fetchRestaurant();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading...
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading...
      </div>
    );
  }

  const handleClick = async () => {
    try {
      console.log("Add to cart clicked");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-black p-6 md:p-8 rounded-lg shadow-lg w-full max-w-3xl mx-auto mt-10 text-center">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-red-500 inline-block text-transparent bg-clip-text mb-6">
        {restaurant.name}
      </h2>
      <p className="text-neutral-300 mb-4">{restaurant.location}</p>
      <p className="text-neutral-300 mb-6">Contact: {restaurant.contact}</p>

      <div>
        {menus.length > 0 ? (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Menu</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {menus.map((menu) => (
                <div
                  key={menu._id}
                  className="border p-4 rounded-lg shadow-md bg-gray-50"
                >
                  <p className="text-gray-800 font-semibold mb-2">
                    {menu.name}
                  </p>
                  <img
                    src={menu.imageUrl}
                    alt={menu.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <p className="text-gray-700 mb-1 font-semibold">
                    Price: ${menu.price}
                  </p>
                  <p className="text-gray-700 mb-1">{menu.description}</p>
                  <p className="text-gray-700 mb-1">
                    Category: {menu.category}
                  </p>
                  <p
                    className={`text-sm font-semibold ${
                      menu.availability ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {menu.availability ? "Available" : "Out of stock"}
                  </p>
                  <button
                    type="button"
                    onClick={handleClick}
                    className="mt-3 w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                  >
                    Add To Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-red-600 text-center">No menu available</div>
        )}
      </div>

      {errorMessage && (
        <div className="text-red-600 text-center mt-4">{errorMessage}</div>
      )}
    </div>
  );
}

export default SingleRestaurant;
