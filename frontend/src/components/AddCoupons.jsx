import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCoupons = () => {
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [validFrom, setValidFrom] = useState("");
  const [validUntil, setValidUntil] = useState("");

  // const [successMessage, setSuccessMessage] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  useEffect(() => {
    axios
      .get(`${API_URL}/api/restaurants`)
      .then((res) => {
        setRestaurants(res.data.data);
      })
      .catch((err) => {
        console.error("Failed to fetch restaurants:", err);
        toast.error(":x: Failed to load restaurants. Please try again later.");
      });
  }, []);

  const handleRestaurantChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedRestaurants(selectedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/offers/create`, {
        code,
        description,
        discount,
        validFrom,
        validUntil,
        applicableToRestaurants: selectedRestaurants,
      })
      .then((res) => {
        console.log(res.data);
        toast.success("🎉 Coupon added successfully!");

        setCode("");
        setDescription("");
        setDiscount("");
        setValidFrom("");
        setValidUntil("");
        setSelectedRestaurants([]);
      })
      .catch((err) => {
        const errorMsg = err.response
          ? err.response.data.message
          : "Something went wrong. Please try again.";
        toast.error(`❌ ${errorMsg}`);
      });
  };

  return (
    <div className="flex items-center justify-center w-full md:mt-4 md:pt-24 ">
      <div className="bg-red-950/30 backdrop-blur p-8 rounded-lg shadow-lg w-full max-w-md min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Add Coupons
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="p-1 block font-bold text-neutral-100">
              Coupon Code:
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white bg-gray-900 text-white"
            />
          </div>

          <div>
            <label className="p-1 block font-bold text-neutral-100">
              Description:
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white bg-gray-900 text-white"
            />
          </div>

          <div>
            <label className="p-1 block font-bold text-neutral-100">
              Discount:
            </label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white bg-gray-900 text-white"
            />
          </div>

          <div>
            <label className="p-1 block font-bold text-neutral-100">
              Valid From:
            </label>
            <input
              type="date"
              value={validFrom}
              onChange={(e) => setValidFrom(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white bg-gray-900 text-white"
            />
          </div>

          <div>
            <label className="p-1 block font-bold text-neutral-100">
              Valid To:
            </label>
            <input
              type="date"
              value={validUntil}
              onChange={(e) => setValidUntil(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white bg-gray-900 text-white"
            />
          </div>

          <div>
            <label className="p-1 block font-bold text-neutral-100">
              Applicable Restaurant:
            </label>
            <select
              value={selectedRestaurants}
              onChange={handleRestaurantChange}
              multiple
              required
              className="w-full mt-1 px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white bg-gray-900 text-white mb-4"
            >
              {restaurants.map((rest) => (
                <option className="py-2" key={rest._id} value={rest._id}>
                  {rest.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-orange-700 font-bold text-white rounded-lg hover:bg-orange-600"
          >
            Add Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupons;
