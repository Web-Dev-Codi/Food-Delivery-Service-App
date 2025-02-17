import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaSearch, FaUser, FaBiking, FaWalking } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BottomNav from "./views/BottomNav";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
 
  const  navigate = useNavigate();

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get("http://localhost:8000/offers");
        setCoupons(response.data.data);
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message ||
            "An error occurred while fetching coupons"
        );
      }
    };
    fetchCoupons();
  }, []);

  const handleSearch = async () => {
    if (searchQuery.trim() !== "") {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/restaurants/name/${searchQuery}`
        );
  
        const restaurant = response.data.data;
        
        if (restaurant && restaurant._id) {
          // Navigate to the restaurant's page using its ID
          navigate(`/restaurants/${restaurant._id}`);
        } else {
          alert("Restaurant not found.");
        }
      } catch (error) {
        console.error("Error fetching restaurant:", error);
        alert("An error occurred while searching for the restaurant.");
      }
    }
  };







  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/restaurants"
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
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 480, // Mobile screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Small screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1024, // Medium screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1440, // Large screens
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
    ],
  };

  const foodCategories = ["Indian", "Thai", "Mexican", "Classic"];

  const uniqueCoupons = coupons.filter((coupon, index, self) =>
    index === self.findIndex((c) => c._id === coupon._id)
);

 

  return (
    <>
      <header className="flex justify-between items-center px-4 py-3 bg-transparent shadow-md text-white">
        <div className="flex items-center space-x-3">
          <FaWalking className="text-lg sm:text-xl" />
          <FaBiking className="text-lg sm:text-xl" />
        </div>
        <h4 className="text-sm sm:text-base md:text-lg font-semibold text-center">
          Delivery
          <p className="text-xs sm:text-sm">123 4th Street NY 20533</p>
        </h4>
        <FaUser className="text-lg sm:text-xl" />
      </header>

      {/* Search Bar */}
      <div className="flex items-center bg-gradient-to-r from-[#4436BD] via-[#392679] to-[#050913] p-2 mx-3 sm:mx-4 my-3 rounded-full shadow-md">
      
        <input
          type="text"
          placeholder="Search restaurants..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-3 py-2 outline-none bg-transparent text-white placeholder-gray-400 text-sm sm:text-base"
         

        />
        <FaSearch className="mr-3 text-gray-500" onClick={handleSearch} />
      </div>

      {/* Categories Section */}
      <div className="flex flex-col space-y-4 my-3 px-3 sm:px-4">
        <div className="flex justify-between items-center">
          <h5 className="text-lg sm:text-2xl font-bold text-white">
            Top Rated Restaurants
          </h5>
          <Link
            to="/restaurants"
            className="text-sm text-gray-400 hover:text-gray-300"
          >
            View all
          </Link>
        </div>
        <div className="flex justify-around space-x-3 sm:space-x-4 overflow-x-auto">
          {restaurants.length > 0 ? (
            restaurants.map(({ images, _id }, index) => (
              <Link
                to={`/restaurants/${_id}`}
                key={index}
                className="flex flex-col items-center"
              >
                <img
                  src={images[0]}
                  alt={foodCategories[index]}
                  className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 xl:h-32 xl:w-32 object-cover rounded-xl shadow-lg mb-1"
                />
                <p className="text-neutral-300 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-center">
                  {foodCategories[index]}
                </p>
              </Link>
            ))
          ) : (
            <div className="text-center text-red-600 text-sm sm:text-xl font-semibold">
              {errorMessage || "No restaurants available"}
            </div>
          )}
        </div>
      </div>

    {/* Slider Section */}
<div className="w-full max-w-screen-lg mx-auto">
{uniqueCoupons.length > 0 ? (
  <Slider {...sliderSettings}>
    {coupons.map((coupon) => (
      <div
        key={coupon._id}
        className="w-full p-4 bg-neutral-100/20 backdrop-blur rounded-lg shadow-lg"
      >
        <div className="text-red-700 text-lg sm:text-2xl font-bold">
          {coupon.discount}% OFF
        </div>
        <div className="text-neutral-800 text-sm sm:text-lg font-semibold mt-2">
          {coupon.description}
        </div>
        <div className="text-xs text-black-600 mt-2">
          <span>Valid From: {new Date(coupon.validFrom).toLocaleDateString()}</span>
          <br />
          <span>Valid Until: {new Date(coupon.validUntil).toLocaleDateString()}</span>
          <br />
          <span>Code: <strong>{coupon.code}</strong></span>
          <br />
          <span>
            Applicable To:{" "}
            {coupon.applicableToRestaurants?.length > 0
              ? coupon.applicableToRestaurants.map((res) => res.name).join(", ")
              : "All Restaurants"}
          </span>
        </div>
      </div>
    ))}
  </Slider>
) : (
  <p className="text-center text-gray-600">No coupons available at the moment.</p>
)}
</div> 



      {/* Featured Food */}
      <h3 className="text-lg sm:text-2xl font-bold text-white text-center">
        Fastest food near you!
      </h3>
      <div className="flex-1 flex justify-center items-center my-3">
        <img
          src="/featured-food.jpg"
          alt="Featured Food"
          className="h-[35vw] w-[35vw] sm:h-40 sm:w-40 md:h-48 md:w-48 rounded-full shadow-lg"
        />
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </>
  );
};

export default Home;
