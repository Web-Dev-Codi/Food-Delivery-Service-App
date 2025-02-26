import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddMenuForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    short_desc: "",
    description: "",
    category: "",
    imageUrl: "",
    availability: "Available", // Match backend enum
    restaurant: "", // Store restaurant ID here
    ratings: 0, // Default rating
  });

  const [restaurants, setRestaurants] = useState([]); // Store list of restaurants

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
           


        const response = await axios.get(
          "http://localhost:8000/api/restaurants"
          
        );
        setRestaurants(response.data.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        toast.error("Failed to load restaurants. Please try again.");
      }
    };

    fetchRestaurants();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const openCloudinaryWidget = () => {
    if (!window.cloudinary) {
      toast.error("Cloudinary is not loaded properly.");
      return;
    }
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "difmxsysx", // Your Cloudinary cloud name
        uploadPreset: "menu_upload", // Your upload preset
        multiple: false,
        sources: ["local", "url", "camera"], // Allow local files, URL, camera
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          toast.success("Image uploaded successfully!");
          setFormData((prevData) => ({
            ...prevData,
            imageUrl: result.info.secure_url, // Update image in state
          }));
        } else if (error) {
          console.error("Upload Error:", error);
          toast.error("Image upload failed. Please try again.");
        }
      }
    );

    widget.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Unauthorized. Please login.");
        return;
      }
      await axios.post("http://localhost:8000/food/menu", 
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      toast.success("Menu added successfully!");
      // Reset form after submission
      setFormData({
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
    } catch (error) {
      console.error("Error adding menu:", error);
      toast.error("Failed to add menu. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="bg-neutral-800/30 backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Add Menu
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="p-1 block font-bold text-neutral-100">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-900 text-white"
            />
          </div>

          <div>
            <label className="p-1 block font-bold text-neutral-100">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="1"
              required
              className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-900 text-white"
            />
          </div>

          <div>
            <label className="p-1 block font-bold text-neutral-100">
              Short Description:
            </label>
            <input
              type="text"
              id="short_desc"
              name="short_desc"
              value={formData.short_desc}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-900 text-white"
            />
          </div>

          <div>
            <label className="p-1 block font-bold text-neutral-100">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-900 text-white"
            />
          </div>

          <div>
            <label className="p-1 block font-bold text-neutral-100">Category:</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-900 text-white"
            >
              <option value="">Select Category</option>
              <option value="Main Course">Main Course</option>
              <option value="Dessert">Dessert</option>
              <option value="Starters">Starters</option>
              <option value="Beverages">Beverages</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="p-1 block font-bold text-neutral-100">Image:</label>
            <button
              type="button"
              onClick={openCloudinaryWidget}
              className="mt-2 w-full py-2 bg-orange-700 font-bold text-white rounded-lg hover:bg-orange-600"
            >
              Upload Image
            </button>
            {formData.imageUrl && (
              <div className="mt-4">
                <img
                  src={formData.imageUrl}
                  alt="Uploaded"
                  className="w-32 h-32 object-cover rounded-md"
                />
              </div>
            )}
          </div>

          <div>
            <label className="p-1 block font-bold text-neutral-100">Restaurant:</label>
            <select
              id="restaurant"
              name="restaurant"
              value={formData.restaurant}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-900 text-white"
            >
              <option value="">Select Restaurant</option>
              {restaurants.map((restaurant) => (
                <option key={restaurant._id} value={restaurant._id}>
                  {restaurant.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-orange-700 font-bold text-white rounded-lg hover:bg-orange-600"
          >
            Add Menu
          </button>
        </form>
      </div>

      {/* Toast Notifications (Bottom Right) */}
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default AddMenuForm;
