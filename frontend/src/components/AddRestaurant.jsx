import React from "react";
import { useState } from "react";
import axios from "axios";
import { set } from "mongoose";




function AddRestaurant() {
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState([]);
  const [contact, setContact] = useState("");
  const [operatingHours, setOperatingHours] = useState({
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const openCloudinaryWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: 'difmxsysx', // Your Cloudinary cloud name
        uploadPreset: 'restaurant_images_upload', // Your unsigned upload preset
        multiple: true, // Allow multiple image uploads
        sources: ['local', 'url', 'camera'], // Allow various sources
        maxFiles: 5, // Limit the number of files
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          // Add the uploaded image URL to the images state
          setImages((prevImages) => [...prevImages, result.info.secure_url]);
        }
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
  
    // Perform basic validation
    if (!name || !location || images.length === 0 || !contact) {
      setErrorMessage("All fields are required, including images.");
      setSuccessMessage("");
      return;
    }
    if (!Object.values(operatingHours).every((hours) => hours.trim() !== "")) {
      setErrorMessage("All operating hours must be filled out.");
      setSuccessMessage("");
      return;
    }
  
    setIsLoading(true);
    try {
      // Sending data to your backend
      const response = await axios.post("http://localhost:3006/api/create", {
        name,
        location,
        images,
        contact,
        operatingHours,
      });
  
      console.log(response.data); // Log the response for debugging
  
      setSuccessMessage("Restaurant added successfully!");
      setErrorMessage("");
      // Optionally reset the form fields
      setName("");
      setLocation("");
      setImages([]);
      setContact("");
      setOperatingHours({
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
        sunday: "",
      });
      setSuccessMessage("");
    } catch (error) {
      console.error(error.response?.data || error.message); // Log detailed error
      setErrorMessage("An error occurred while adding the restaurant.");
      setSuccessMessage("");
    } 
      setIsLoading(false);
   
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add Restaurant</h1>

      {/* Success or Error Messages */}
      {successMessage && (
        <div className="mb-4 p-3 text-green-800 bg-green-100 border border-green-300 rounded">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mb-4 p-3 text-red-800 bg-red-100 border border-red-300 rounded">
          {errorMessage}
        </div>
      )}
      {isLoading && <p className="mb-4 text-blue-500">Loading...</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Restaurant Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Restaurant Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Location */}
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Images */}
        <div>
          <label
            htmlFor="images"
            className="block text-sm font-medium text-gray-700"
          >
            Images
          </label>
          <button
            type="button"
            onClick={openCloudinaryWidget}
            className="mt-2 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none"
          >
            Upload Images
          </button>
          <div className="mt-4 flex flex-wrap gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative w-24 h-24 border border-gray-200 rounded-md overflow-hidden"
              >
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() =>
                    setImages(images.filter((_, i) => i !== index))
                  }
                  className="absolute top-1 right-1 text-red-600 bg-white rounded-full p-1 shadow-md hover:bg-red-600 hover:text-white"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <label
            htmlFor="contact"
            className="block text-sm font-medium text-gray-700"
          >
            Contact
          </label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Operating Hours */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Operating Hours
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(operatingHours).map(([day, hours]) => (
              <div key={day}>
                <label
                  htmlFor={day}
                  className="block text-sm font-medium text-gray-700 capitalize"
                >
                  {day}
                </label>
                <input
                  type="text"
                  id={day}
                  name={day}
                  value={hours}
                  onChange={(e) =>
                    setOperatingHours({
                      ...operatingHours,
                      [day]: e.target.value,
                    })
                  }
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-medium text-sm rounded-md shadow-md hover:bg-blue-700 focus:outline-none"
        >
          Add Restaurant
        </button>
      </form>
    </div>
  );
}

export default AddRestaurant;
