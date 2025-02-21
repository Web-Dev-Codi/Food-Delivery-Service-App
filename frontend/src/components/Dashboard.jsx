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

const Dashboard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex mt-16 flex-col md:flex-row min-h-screen bg-black/60 ">
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

      {/* Main Content Area - Centered */}
      <div className="flex-1 flex items-center justify-center p-6 bg-slate-600/40 ">
        <div className="flex-col items-center justify-center space-y-4 rounded-lg p-4 bg-neutral-800/90">
          <h1 className="text-4xl text-yellow-200">
            Hi Admins, Welcome to dashboard
          </h1>
          <p className="text-xl">Please select you task from the left menu</p>
          <p className="text-red-500">
            Note: If you are not sure or don&apos;t know what you are doing,
            please go make your self a cup of coffee and relax.
          </p>
        </div>
        <div className="w-full max-w-3xl">
          <Outlet /> {/* Nested Routes will be displayed here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
