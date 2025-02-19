import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function SingleMenu() {
  const { id } = useParams();
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/food/menu/singlemenu/${id}`
        );
        setMenu(response.data.data);
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message ||
            "An error occurred while fetching the menu details"
        );
      }
      setLoading(false);
    };

    fetchMenu();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading...
      </div>
    );
  }

  if (!menu) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Menu not found.
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
        {menu.name}
      </h2>
      <img
        src={menu.imageUrl}
        alt={menu.name}
        className="w-full h-64 object-cover mb-4"
      />
      <p className="text-gray-700 mb-4">{menu.description}</p>
      <p className="text-gray-700 mb-4">${menu.price}</p>
      <button
        type="button"
        className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
        Add to Cart
      </button>
      {errorMessage && (
        <div className="text-red-600">{errorMessage}</div>
      )}
    </div>
  );
}

export default SingleMenu;
