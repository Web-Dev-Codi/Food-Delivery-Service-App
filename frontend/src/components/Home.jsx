import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaUser,
  FaShoppingCart,
  FaCog,
  FaBiking,
  FaWalking,
} from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3006/api/restaurants"
        );
        setRestaurants(response.data.data.slice(0, 4)); // Fetch only the first 4 restaurants
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message ||
            "An error occurred while fetching restaurants"
        );
      }
    };
    fetchRestaurants();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
  };

  return (
    <div className="bg-gradient-to-b from-{#4436BD} via-{#392679} to-{#050913} min-h-screen flex flex-col">
      <header className="flex justify-between items-center px-4 py-3 bg-transparent shadow-md">
        <div className="flex items-center space-x-3">
          <FaWalking className="text-xl text-gray-700" />
          <FaBiking className="text-xl text-gray-700" />
        </div>
        <h4 className="text-xl font-semibold ">
          Delivery <p>123 4th Street NY 20533</p>
        </h4>
        <FaUser className="text-xl text-gray-700" />
      </header>

      <div className="flex items-center bg-white p-2 mx-4 my-3 rounded-full shadow-md">
        <FaSearch className="ml-3 text-gray-500" />
        <input
          type="text"
          placeholder="Search restaurants..."
          className="flex-1 px-3 py-2 outline-none"
        />
      </div>

      <div className="flex flex-col space-y-4 my-3 px-4 bg-purple-800/30 backdrop-blur ">
        <div className="flex justify-between items-center">
          <h5 className="text-2xl font-bold text-white">Categories</h5>
          <Link to="/categories" className="text-sm text-gray-500">
            View all
          </Link>
        </div>
        <div className="flex space-x-4">
          {restaurants.length > 0 ? (
            restaurants.map(({ images, _id, name }, index) => (
              <Link
                to={`/restaurants/${_id}`}
                key={index}
                className="flex justify-between items-center"
              >
                <img
                  src={images[0]}
                  alt={name}
                  className="h-20 w-20 object-cover rounded-xl shadow-lg mb-2"
                />

                {/*  <button className="bg-white px-4 py-2 rounded-full shadow-md text-neutral-700 text-sm font-semibold">
                {name}
              </button> */}
              </Link>
            ))
          ) : (
            <div className="text-center text-red-600 text-xl font-semibold">
              {errorMessage || "No restaurants available"}
            </div>
          )}
        </div>
      </div>

      <div className="mx-4 my-3">
        <Slider {...sliderSettings}>
          {["/img1.jpg", "/img2.jpg", "/img3.jpg"].map((src, idx) => (
            <div key={idx} className="h-40 md:h-56 w-full">
              <img
                src={src}
                alt="Offer"
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
          ))}
        </Slider>
      </div>

      <h3 className="text-2xl font-bold text-white">Fastest food near you!</h3>

      <div className="flex-1 flex justify-center items-center my-3">
        <img
          src="/featured-food.jpg"
          alt="Featured Food"
          className="h-48 w-48 object-cover rounded-full shadow-lg"
        />
      </div>
      {/* <BlueGradientBg /> */}

      <nav className="fixed bottom-0 left-0 w-full bg-white shadow-md py-3 flex justify-around">
        <FaCog className="text-xl text-gray-700" />
        <FaSearch className="text-xl text-gray-700" />
        <FaShoppingCart className="text-xl text-gray-700" />
        <FaUser className="text-xl text-gray-700" />
      </nav>
    </div>
  );
};

export default Home;
