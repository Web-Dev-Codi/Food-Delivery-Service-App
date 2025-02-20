import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { FaUtensils, FaConciergeBell, FaTags, FaBars } from "react-icons/fa";

const Dashboard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex mt-16 flex-col md:flex-row min-h-screen bg-black/30 ">
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden p-3 bg-black text-white fixed top-24 left-4
        rounded-lg z-50"
      >
        <FaBars className="text-2xl" />
      </button>
      {/* Sidebar / Top Navbar for small screens */}
      <nav
        className={`w-full md:w-20 bg-black p-2 rounded-lg md:p-6 border-b border-neutral-500 md:border-b-0 md:border-l
          transition-all duration-1000 ease-in-out 
          ${isHovered ? "md:w-64" : "md:w-24"}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <ul className="flex justify-around md:flex-col p-1 md:space-y-4 space-x-3 md:space-x-0 bg-red-600">
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
        </ul>
      </nav>

      {/* Main Content Area - Centered */}
      <div className="flex-1 flex items-center justify-center p-6 bg-slate-600/40 ">
        <div className="w-full max-w-3xl">
          <Outlet /> {/* Nested Routes will be displayed here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
