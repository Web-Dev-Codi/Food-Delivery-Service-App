import React, { useState, useEffect } from "react";
import axios from "axios";

const AddCoupons = () => {
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [validFrom, setValidFrom] = useState("");
  const [validUntil, setValidUntil] = useState("");
 
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);

  // Fetch restaurants on component load
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/restaurants")
      .then((res) => {
        setRestaurants(res.data.data);
      })
      .catch((err) => {
        console.error("Failed to fetch restaurants:", err);
        setErrorMessage("Failed to load restaurants. Please try again later.");
      });
  }, []);

  const handleRestaurantChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedRestaurants(selectedOptions);
};

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ code, description, discount, validFrom, validUntil, selectedRestaurants });

    axios
      .post("http://localhost:3006/offers/create", {
        code,
        description,
        discount,
        validFrom,
        validUntil,
        applicableToRestaurants: selectedRestaurants 
      })
      .then((res) => {
        setSuccessMessage(res.data.message);
        alert("coupon added successfully");
        setErrorMessage("");
        console.log(res.data.data);
        setData(res.data.data);
        
        // Clear form fields after successful submission
        setCode("");
        setDescription("");
        setDiscount("");
        setValidFrom("");
        setValidUntil("");
        setSuccessMessage("");
      })
      .catch((err) => {
        const errorMsg = err.response
          ? err.response.data.message
          : "Something went wrong. Please try again.";
        setErrorMessage(errorMsg);
        setSuccessMessage("");
        console.error(err);
      });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Add Coupons</h1>

      <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md" onSubmit={handleSubmit}>

        <div className="mb-4">
          <label htmlFor="coupon" className="block text-sm font-medium text-gray-600">
            Coupon Code:
          </label>
          <input
            type="text"
            id="coupon"
            name="coupon"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-600">
            Description:
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="discount" className="block text-sm font-medium text-gray-600">
            Discount:
          </label>
          <input
            type="number"
            id="discount"
            name="discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="validFrom" className="block text-sm font-medium text-gray-600">
            Valid From:
          </label>
          <input
            type="date"
            id="validFrom"
            name="validFrom"
            value={validFrom}
            onChange={(e) => setValidFrom(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="validUntil" className="block text-sm font-medium text-gray-600">
            Valid To:
          </label>
          <input
            type="date"
            id="validUntil"
            name="validUntil"
            value={validUntil}
            onChange={(e) => setValidUntil(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="restaurant" className="block text-sm font-medium text-gray-600">
            Applicable Restaurant:
          </label>
          <select
            id="restaurant"
            value={selectedRestaurants}
            onChange={handleRestaurantChange}
          multiple
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            
            {restaurants.map((rest) => (
              <option key={rest._id} value={rest._id}>{rest.name}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Coupon
        </button>
      </form>

      {successMessage && (
        <div className="mt-4 text-green-600">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mt-4 text-red-600">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default AddCoupons;
