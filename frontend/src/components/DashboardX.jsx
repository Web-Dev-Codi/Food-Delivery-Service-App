import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import {
  FaUtensils,
  FaConciergeBell,
  FaTags,
  FaBars,
  FaTimes,
  FaBalanceScale,
  FaAddressBook,
  FaAddressCard,
} from "react-icons/fa";

const DashboardX = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div className="flex mt-16 flex-col md:flex-row min-h-screen">
      {/* Mobile Menu Btn */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden p-3 bg-black text-white fixed top-24 left-4
        rounded-lg z-20"
      >
        {isMobileMenuOpen ? (
          <FaTimes className="text-2xl" />
        ) : (
          <FaBars className="text-2xl" />
        )}
      </button>
      {/* Slide-NavBar*/}
      <nav
        className={`fixed left-0 w-64 bg-white p-2 border-l border-neutral-500 transition-all duration-1000 ease-in-out
        ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0
        md:w-20 md:p-6 md:border-l ${isHovered ? "md:w-64" : "md:w-24"}
      `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <ul className="md:flex-col p-1 md:space-y-4 space-x-3 md:space-x-0 bg-red-600 min-h-screen">
          {/* Add Restaurant */}
          <li className="flex items-center gap-1 transition-all duration-1000 ease-in-out hover:bg-black ">
            <Link to="restaurants/add" className="flex justify-around">
              <FaUtensils className="text-white text-4xl" />
              <span
                className={`text-neutral-300 ml-4 text-lg font-medium transition-all duration-1000 transform whitespace-nowrap
        ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}
      `}
              >
                Add Restaurant
              </span>
            </Link>
          </li>

          {/* Add Menu */}
          <li className="flex items-center gap-1 transition-all duration-1000 ease-in-out hover:bg-black ">
            <Link to="add-menu" className="flex justify-around">
              <FaConciergeBell className="text-white text-4xl" />
              <span
                className={`text-neutral-300 ml-4 text-lg font-medium transition-all duration-1000 transform whitespace-nowrap
        ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}
      `}
              >
                Add Menu
              </span>
            </Link>
          </li>

          {/* Add Coupons */}
          <li className="flex items-center gap-1 transition-all duration-1000 ease-in-out hover:bg-black ">
            <Link to="coupons" className="flex justify-around">
              <FaTags className="text-white text-4xl" />
              <span
                className={`text-neutral-300 ml-4 text-lg font-medium transition-all duration-1000 transform whitespace-nowrap
        ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}
      `}
              >
                Add Coupons
              </span>
            </Link>
          </li>
          {/* Adding mocks li/Links */}
          <li className="flex items-center gap-1 transition-all duration-1000 ease-in-out hover:bg-black ">
            <Link to="restaurants/add" className="flex justify-around">
              <FaBalanceScale className="text-white text-4xl" />
              <span
                className={`text-neutral-300 ml-4 text-lg font-medium transition-all duration-1000 transform whitespace-nowrap
        ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}
      `}
              >
                Add Balance
              </span>
            </Link>
          </li>

          {/* Add Menu */}
          <li className="flex items-center gap-1 transition-all duration-1000 ease-in-out hover:bg-black ">
            <Link to="add-menu" className="flex justify-around">
              <FaAddressBook className="text-white text-4xl" />
              <span
                className={`text-neutral-300 ml-4 text-lg font-medium transition-all duration-1000 transform whitespace-nowrap
        ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}
      `}
              >
                Add Booking
              </span>
            </Link>
          </li>

          {/* Add Cards */}
          <li className="flex items-center gap-1 transition-all duration-1000 ease-in-out hover:bg-black ">
            <Link to="coupons" className="flex justify-around">
              <FaAddressCard className="text-white text-4xl" />
              <span
                className={`text-neutral-300 ml-4 text-lg font-medium transition-all duration-1000 transform whitespace-nowrap
        ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}
      `}
              >
                Add Cards
              </span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* CenterContainer-Admin-Area */}
      <div className="flex-1 flex flex-col lg:flex-row justify-center items-start p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-0 bg-red-600">
        {/* Left side: Admin Section */}
        <div className="min-h-screen flex-1 flex flex-col items-center justify-start space-y-6 border-dashed border-2 border-neutral-500 rounded-lg p-4 sm:p-4 bg-slate-600/40 w-full lg:max-w-[60%] xl:max-w-[65%]">
          <h1 className="text-xl sm:text-2xl font-bold text-center text-white">
            Hello Admin
          </h1>
          <p className="text-neutral-300 text-center text-sm sm:text-base px-2 sm:px-4">
            Welcome to the Admin Dashboard of the Restaurant Management System.
            You can add Restaurants, Menus, Coupons, and more from the sidebar.
            Click on the menu icon to view the options. Enjoy your day!
          </p>

          {/* Responsive Grid Layout for incoming functionalities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 w-full max-w-xl mx-auto">
            <div className="p-4 bg-orange-500 text-white font-bold rounded-md shadow-md w-full">
              1: Orange
            </div>
            <div className="p-4 bg-green-500 text-white font-bold rounded-md shadow-md w-full">
              2: Green
            </div>
            <div className="p-4 bg-violet-500 text-white font-bold rounded-md shadow-md w-full">
              3: Violet
            </div>
            <div className="p-4 bg-pink-500 text-white font-bold rounded-md shadow-md w-full">
              4: Pink
            </div>
            <div className="p-4 bg-blue-500 text-white font-bold rounded-md shadow-md w-full">
              5: Blue
            </div>
            <div className="p-4 bg-yellow-700 text-white font-bold rounded-md shadow-md w-full">
              6: Brown
            </div>
          </div>
        </div>

        {/* Right side: Outlet (Nested Routes) */}
        <div className="min-h-screen w-full lg:max-w-[425px] xl:max-w-[550px] bg-green-600">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardX;
