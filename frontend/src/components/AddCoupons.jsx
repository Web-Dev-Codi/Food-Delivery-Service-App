import React, { useState } from "react";
import axios from "axios";

function AddCoupons() {
    const [code, setCode] = useState("");
    const [description, setDescription] = useState("");
    const [discount, setDiscount] = useState("");
    const [validFrom, setValidFrom] = useState("");
    const [validTo, setValidTo] = useState("");
    const [restaurant, setRestaurant] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); // State for success message
    const [errorMessage, setErrorMessage] = useState(""); // State for error message





    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ code, description, discount, validFrom, validTo, restaurant });
        const response = axios
       


    }

  return (
    <div>
    <h1>ADD Coupons</h1>

    <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md" onSubmit={handleSubmit}>

    <div className="mb-4">
    <label htmlFor="coupon" className="block text-sm font-medium text-gray-600">Coupon Code:</label>
    <input type="text" 
    id="coupon" 
    name="coupon"
    value={code}
    onChange={(e) => setCode(e.target.value)}
    required 
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    </div>

    <div className="mb-6">
    <label htmlFor="description" className="block text-sm font-medium text-gray-600">Description:</label>
    <input type="text"
    id="description"
    name="description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    required
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    </div>

    <div className="mb-6">
    <label htmlFor="discount" className="block text-sm font-medium text-gray-600">Discount:</label>
    <input type="number"
    id="discount"
    name="discount"
    value={discount}
    onChange={(e) => setDiscount(e.target.value)}
    required
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    </div>

    <div className="mb-6">
    <label htmlFor="validFrom" className="block text-sm font-medium text-gray-600">Valid From:</label>
    <input type="date"
    id="validFrom"
    name="validFrom"
    value={validFrom}
    onChange={(e) => setValidFrom(e.target.value)}
    required
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    </div>

    <div className="mb-6">
    <label htmlFor="validTo" className="block text-sm font-medium text-gray-600">Valid To:</label>
    <input type="date"
    id="validTo"
    name="validTo"
    value={validTo}
    onChange={(e) => setValidTo(e.target.value)}
    required
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    </div>

     <div className="mb-6">
     <select 
     id="restaurant"
     name="restaurant"
     value={restaurant}
     onChange={(e) => setRestaurant(e.target.value)}
     required
     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
     >
        <option value="restaurant_1" selected>Spice Of India</option>
        <option value="restaurant_2">Bangkok Bites</option>
        <option value="restaurant_3">La Cocina Mexicana (The Mexican Kitchen)</option>
        <option value="restaurant_4">The Classic Diner</option>

    </select>
    </div>
    <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add Coupon</button>
 </form>
    </div>
  )
}

export default AddCoupons