import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'


function SingleRestaurant() {
const { id } = useParams();
const [restaurant, setRestaurant] = useState(null);
const [menus, setMenus] = useState([]);
const [loading, setLoading] = useState(true);
const [errorMessage, setErrorMessage] = useState('');

useEffect(() => {
  const fetchRestaurant = async () => {
    setLoading(true); // Set loading to true at the start of fetching
    try {
      const response = await axios.get(`http://localhost:3006/api/restaurants/${id}`);
      setRestaurant(response.data.data);

      const menuResponse = await axios.get(`http://localhost:3006/food/menu/restaurant/${id}`);
      setMenus(menuResponse.data.data);
    } catch (error) {
      const errorMessage = error.response?.data?.data?.message || "An error occurred while fetching the restaurant details";
      setErrorMessage(errorMessage);
      console.error(error);
    } 
      setLoading(false); // Set loading to false after fetching
    
  };
  fetchRestaurant();
}, [id]);

if (loading) {
  return <div>Loading...</div>; // Show a loading message while fetching data
}

if (!restaurant) {
  return <div>Loading...</div>;
}

 const handleclick = async () => {
  try {
    console.log("Add to cart clicked");
  }
  catch (error) {
    console.error(error);
  }
};


  return (

    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
    <h2 className="text-2xl font-bold text-center text-gray-700 mb-6 bg-red-400">{restaurant.name}</h2>
    <p className="text-gray-700 mb-6 bg-blue-400">{restaurant.location}</p>
    <p className="text-gray-700 mb-6 bg-yellow-500">{restaurant.contact}</p>
    
    <div className="text-center">
      {menus.length > 0 ? (
        <div>
          <h3 className="text-xl font-bold text-gray-700 mb-4">Menu</h3>
          {menus.length > 0 ? (
            menus.map((menu) => (
            <div key={menu._id} className="mb-4">
              <p className="text-gray-700 mb-2">{menu.name}</p>
              <img src={menu.imageUrl} alt={menu.name} className="w-full h-64 object-cover mb-4"/>
              <p className="text-gray-700 mb-2">{menu.price}</p>
              <p className="text-gray-700 mb-2">{menu.description}</p>
              <p className="text-gray-700 mb-2">{menu.category}</p>
              <p className="text-gray-700 mb-2">{menu.availability}</p>
              <button type="button" onClick={handleclick} className="w-full bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
              Add To Cart </button>
            </div>
          ))
          ) : (
            <div className="text-red-600">No menu available</div>
          )}
        </div>
      ) : (
        <div className="text-red-600">No menu available</div>
      )}
     
      {errorMessage && <div className="text-red-600">{errorMessage}</div>}
  </div>
 
</div>
);
}




export default SingleRestaurant;