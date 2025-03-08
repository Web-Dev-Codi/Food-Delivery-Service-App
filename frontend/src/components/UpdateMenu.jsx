import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateMenuForm = () => {
  const [menuName, setMenuName] = useState(""); // Search input for menu name
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    short_desc: "",
    description: "",
    category: "",
    imageUrl: "",
    availability: "Available",
    restaurant: "",
    ratings: 0,
  });

  const [restaurants, setRestaurants] = useState([]);
  const [isMenuFound, setIsMenuFound] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/restaurants`);
        setRestaurants(response.data.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };
    fetchRestaurants();
  }, []);

  const fetchMenuByName = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/food/menu/getByName/${menuName}`
      );
      if (response.data.data) {
        setFormData(response.data.data);
        setIsMenuFound(true);
      } else {
        alert("Menu item not found!");
        setIsMenuFound(false);
      }
    } catch (error) {
      console.error("Error fetching menu:", error);
      alert("Error fetching menu. Please check the name and try again.");
      setIsMenuFound(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const openCloudinaryWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: "difmxsysx",
        uploadPreset: "menu_upload",
        multiple: false,
        sources: ["local", "url", "camera"],
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Upload Success:", result.info.secure_url);
          setFormData((prevData) => ({
            ...prevData,
            imageUrl: result.info.secure_url, // Update the image URL
          }));
        } else if (error) {
          console.error("Upload Error:", error);
          alert("Image upload failed. Please try again.");
        }
      }
    );

    widget.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData._id) {
      toast.error("Invalid menu item. Please try again.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Unauthorized. Please login to continue.");
        return;
      }
      await axios.patch(
        `http://localhost:8000/food/menu/${formData._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Menu updated successfully!");
    } catch (error) {
      console.error("Error updating menu:", error);
      alert("Failed to update menu. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center w-full md:mt-4 md:pt-24 ">
      <div className="bg-red-950/30 backdrop-blur p-8 rounded-lg shadow-lg w-full max-w-md min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Update Menu
        </h1>

        {/* Search Menu By Name */}
        <div className="mb-4">
          <label className="p-1 block font-bold text-neutral-100">
            Enter Menu Name:
          </label>
          <input
            type="text"
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
            className="w-full mt-1 px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white bg-black/60 focus:bg-black/80 text-white mb-4"
          />
          <button
            onClick={fetchMenuByName}
            className="mt-4 w-full py-2 bg-orange-600 font-bold text-white rounded-lg hover:bg-orange-500 transition"
          >
            Search Menu
          </button>
        </div>

        {/* If menu found, show the update form */}
        {isMenuFound && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="p-1 block font-bold text-neutral-100">
                Name:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white bg-black/60 focus:bg-black/80 text-white mb-4"
              />
            </div>

            <div>
              <label className="p-1 block font-bold text-neutral-100">
                Price:
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="1"
                required
                className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-black/60 focus:bg-black/80 text-white"
              />
            </div>

            <div>
              <label className="p-1 block font-bold text-neutral-100">
                Short Description:
              </label>
              <input
                type="text"
                name="short_desc"
                value={formData.short_desc}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-black/60 focus:bg-black/80 text-white"
              />
            </div>

            <div className="bg-black/50 p-2 rounded-lg shadow-lg border border-gray-700">
              <label className="block text-lg font-semibold text-neutral-100 mb-2">
                Description:
              </label>

              {/* A bit of Improvement in textarea */}
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={8} // textarea default with 8 rows
                className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-black/60 text-white focus:bg-black/80 focus:ring-2 focus:ring-white focus:outline-none transition-all resize-none sm:resize-y"
                placeholder="Enter menu description..."
                onFocus={(e) => (e.target.rows = 12)} // Add event to expand on focus to 12 rows
                onBlur={(e) => (e.target.rows = 8)} // Shrink back on blur
              />
            </div>

            <div>
              <label className="p-1 block font-bold text-neutral-100">
                Category:
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-black/60 focus:bg-black/80 text-white"
              >
                <option className="bg-black" value="">
                  Select Category
                </option>
                <option className="bg-black" value="Main Course">
                  Main Course
                </option>
                <option className="bg-black" value="Dessert">
                  Dessert
                </option>
                <option className="bg-black" value="Starters">
                  Starters
                </option>
                <option className="bg-black" value="Beverages">
                  Beverages
                </option>
              </select>
            </div>

            {/* Image Upload */}
            <div className="bg-black/50 p-2 rounded-lg shadow-lg border border-gray-700">
              <label className="block text-lg font-semibold text-neutral-100 mb-2">
                Upload Images:
              </label>
              <button
                type="button"
                onClick={openCloudinaryWidget}
                className="mt-2 w-full py-2 bg-orange-700 font-bold text-white rounded-lg hover:bg-orange-600"
              >
                Upload Image
              </button>
              {formData.imageUrl && (
                <div className="w-24 h-24 sm:w-28 sm:h-28 mt-3 mb-1 overflow-hidden rounded-lg border border-gray-500 shadow-md">
                  <img
                    src={formData.imageUrl}
                    alt="Uploaded"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="p-1 block font-bold text-neutral-100">
                Ratings (0-5):
              </label>
              <input
                type="number"
                name="ratings"
                value={formData.ratings}
                onChange={handleChange}
                min="0"
                max="5"
                step="0.1" // Allow decimal ratings
                required
                className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-black/60 focus:bg-black/80 text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-orange-700 font-bold text-white rounded-lg hover:bg-orange-600"
            >
              Update Menu
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateMenuForm;
