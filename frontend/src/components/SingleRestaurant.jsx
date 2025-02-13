import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function SingleRestaurant() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [menuCategory, setMenuCategory] = useState("Select");

  // Fetch restaurant and menu data in a single useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const restaurantResponse = await axios.get(
          `http://localhost:8000/api/restaurants/${id}`
        );
        setRestaurant(restaurantResponse.data.data);

        const menuResponse = await axios.get(
          `http://localhost:8000/food/menu/restaurant/${id}`
        );
        setMenus(menuResponse.data.data);
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message ||
            "An error occurred while fetching the restaurant details"
        );
      }
      setLoading(false);
    };

    fetchData();
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
        Restaurant not found.
      </div>
    );
  }

  // Filter menus based on category selection
  const filteredMenus =
    menuCategory === "Select"
      ? menus
      : menus.filter((menu) => menu.category === menuCategory);

  const handleClick = () => {
    console.log("Add to cart clicked");
  };

  return (
    <>
      <select
        className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-md mb-4"
        value={menuCategory}
        onChange={(e) => setMenuCategory(e.target.value)}
      >
        <option value="Select">All Categories</option>
        <option value="Main Course">Main Course</option>
        <option value="Dessert">Dessert</option>
        <option value="Beverages">Beverages</option>
      </select>

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          {restaurant.name}
        </h2>
        <p className="text-gray-700 mb-6">{restaurant.location}</p>
        <p className="text-gray-700 mb-6">{restaurant.contact}</p>

        <div className="text-center">
          {filteredMenus.length > 0 ? (
            filteredMenus.map((menu) => (
              <div key={menu._id} className="mb-4">
                <p className="text-gray-700 mb-2">{menu.name}</p>
                <img
                  src={menu.imageUrl}
                  alt={menu.name}
                  className="w-full h-64 object-cover mb-4"
                />
                <p className="text-gray-700 mb-2">${menu.price}</p>
                <p className="text-gray-700 mb-2">{menu.description}</p>
                <p className="text-gray-700 mb-2">{menu.category}</p>
                <p className="text-gray-700 mb-2">{menu.availability}</p>
                <button
                  type="button"
                  onClick={handleClick}
                  className="w-full bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Add To Cart
                </button>
              </div>
            ))
          ) : (
            <div className="text-red-600">
              No menu available for this category
            </div>
          )}
        </div>

        {errorMessage && <div className="text-red-600">{errorMessage}</div>}
      </div>
    </>
  );
}

export default SingleRestaurant;
