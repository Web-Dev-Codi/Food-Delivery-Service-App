import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Logo from "../assets/images/icescream.jpg";

function SingleRestaurant() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [menuCategory, setMenuCategory] = useState("Select");

  const navigate = useNavigate();
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

  const handleClick = (menuId) => {
    navigate(`/menu/${menuId}`);

    console.log("show Details");
  };

  return (
    <>
      <div className="bg-neutral-900 p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
        {/* Restaurant Image */}
        <div className="relative">
          <img
            src={restaurant.images[0]}
            alt={restaurant.name}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />

          {/* Restaurant Info */}
          <div className="absolute left-4 bottom-[-2] transform -translate-y-1/2 bg-neutral-800/20 backdrop-blur-md rounded-lg p-6 shadow-lg flex items-center gap-4 z-50 ">
            {/* Restaurant Logo */}
            <img
              className="w-16 h-16 object-cover rounded-full"
              src={Logo}
              alt="Logo"
            />

            {/* Restaurant name */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-200">
                {restaurant.name}
              </h2>
              <p className="text-gray-200">{restaurant.location}</p>
              <p className="text-gray-200">{restaurant.contact}</p>
            </div>
          </div>
        </div>
        <select
          className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-md mt-16 mb-4"
          value={menuCategory}
          onChange={(e) => setMenuCategory(e.target.value)}
        >
          <option value="Select">All Categories</option>
          <option value="Main Course">Main Course</option>
          <option value="Dessert">Dessert</option>
          <option value="Beverages">Beverages</option>
        </select>

        <div className="text-center bg-gradient-to-r from-[#e62b2b] via-[#22193f] to-[#3e1a5d] p-4 rounded-lg shadow-lg">
          {filteredMenus.length > 0 ? (
            filteredMenus.map((menu) => (
              <div
                key={menu._id}
                className="flex items-center gap-6 mb-6 bg-neutral-800/50 backdrop-blur-md p-3 rounded-lg shadow-md border border-neutral-500"
              >
                <div className="flex-1 text-left">
                  <p className="text-neutral-300 text-lg font-bold mb-2">
                    {menu.name}
                  </p>
                  <p className="text-gray-200 text-lg font-medium mb-4">
                    €{menu.price}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleClick(menu._id)}
                    className="bg-transparent text-green-400 px-4 py-2 rounded-md hover:text-neutral-300"
                  >
                    Show Details
                  </button>
                </div>

                {/* Menu Image - Right Side */}
                <img
                  src={menu.imageUrl}
                  alt={menu.name}
                  className="w-48 h-32 object-cover rounded-lg shadow-md"
                />
              </div>
            ))
          ) : (
            <p className="text-gray-200">No menus available.</p>
          )}
        </div>

        {errorMessage && <div className="text-red-600">{errorMessage}</div>}
      </div>
    </>
  );
}

export default SingleRestaurant;
