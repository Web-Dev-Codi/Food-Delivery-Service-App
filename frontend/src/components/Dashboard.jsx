import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { FaUtensils, FaConciergeBell, FaTags } from "react-icons/fa";

const Dashboard = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex mt-16 flex-col md:flex-row md:mt-2 min-h-screen">
      {/* Sidebar / Top Navbar for small screens */}
      <nav
        className={`w-full md:w-64 bg-gradient-to-tr from-orange-950 from-20% via-black via-90% to-black p-2 rounded-lg md:p-6 border-b border-neutral-500 md:border-b-0 md:border-l md:mt-10 
          transition-all duration-1000 ease-in-out ${
            isHovered ? "md:w-64" : "md:w-20"
          }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`text-2xl mt-1 font-bold text-orange-100 mb-1 text-center md:mb-4 md:text-left transition-opacity duration-1000 ${
            isHovered ? "opacity-100" : "opacity-0 md:opacity-100"
          }`}
        >
          <img src="" alt="" /> {/* Logo */}
        </div>
        <ul className="flex md:flex-col justify-center md:space-y-3 space-x-3 md:space-x-0">
          <li className="flex items-center space-x-3">
            <div className="flex items-center space-x-3">
              <FaUtensils className="text-white text-xl" />
              <span
                className={`font-bold text-white hover:text-orange-500 transition-all duration-300 transform
      ${
        isHovered
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-[-100%] hidden"
      }`}
              >
                <Link to="restaurants/add block ">Add Restaurant</Link>
              </span>
            </div>
          </li>

          <li className="flex items-center space-x-3">
            <FaConciergeBell className="text-white text-xl" />
            <Link
              to="add-menu"
              className={`block font-bold text-white hover:text-orange-500 transition-colors p-2 md:p-0 md:mb-4 
              ${
                isHovered ? "opacity-100" : "opacity-0 md:opacity-100 md:hidden"
              }`}
            >
              Add Menu
            </Link>
          </li>
          <li className="flex items-center space-x-3">
            <FaTags className="text-white text-xl" />
            <Link
              to="coupons"
              className={`block font-bold text-white hover:text-orange-500 transition-colors p-2 md:p-0 
              ${
                isHovered ? "opacity-100" : "opacity-0 md:opacity-100 md:hidden"
              }`}
            >
              Add Coupons
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content Area - Centered */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-3xl">
          <Outlet /> {/* Nested Routes will be displayed here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
