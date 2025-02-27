import { Link, Outlet, useNavigate } from "react-router-dom";
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
  FaArrowCircleRight,
} from "react-icons/fa";

const Dashboard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate(); // Use navigate hook to navigate programmatically. In this case, to navigate outlet panel back to the dashboard
  const [isOutletOpen, setIsOutletOpen] = useState(false);
  // wrapped navItems in an array of objects and map over in ul!
  const navItems = [
    { to: "restaurants/add", icon: FaUtensils, label: "Add Restaurant" },
    { to: "add-menu", icon: FaConciergeBell, label: "Add Menu" },
    { to: "coupons", icon: FaTags, label: "Add Coupons" },
    { to: "restaurants/add", icon: FaBalanceScale, label: "Add Balance" },
    { to: "add-menu", icon: FaAddressBook, label: "Add Booking" },
    { to: "coupons", icon: FaAddressCard, label: "Add Cards" },
  ];
  return (
    <div className="flex mt-12 flex-col md:flex-row min-h-screen">
      {/* Mobile Menu Btn */}
      <button
        onClick={() => {
          setIsMobileMenuOpen(!isMobileMenuOpen);
          setIsOutletOpen(false); // Optional: Close right panel when opening mobile menu
        }}
        className="md:hidden p-3 bg-green-700 text-white fixed top-24 left-4 rounded-lg z-10"
        aria-label="Toggle mobile menu"
      >
        {isMobileMenuOpen ? (
          <FaTimes className="text-2xl" />
        ) : (
          <FaArrowCircleRight className="text-2xl" />
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
          {navItems.map(({ to, icon: Icon, label }) => (
            <li
              key={to}
              className="flex items-center gap-1 transition-all duration-1000 ease-in-out hover:bg-black"
            >
              <Link
                to={to}
                className="flex justify-around"
                onClick={() => {
                  setIsOutletOpen(true); // click on the link to slide in the right panel
                  setIsMobileMenuOpen(false); // Close mobile menu at the same time
                }}
              >
                <Icon className="text-white text-4xl" />
                <span
                  className={`text-neutral-300 ml-4 text-lg font-medium transition-all duration-1000 transform whitespace-nowrap
          ${
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }
        `}
                >
                  {label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* CenterContainer-Admin-Area */}
      <div className="flex-1 flex flex-col lg:flex-row justify-center items-start md:justify-start p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-0 bg-red-600">
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

          {/* Grids for incoming functionalities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 w-full max-w-xl mx-auto">
            <div className="p-4 bg-orange-500 text-white font-bold rounded-md shadow-md w-full h-64">
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
            <div className="p-4 bg-black text-white font-bold rounded-md shadow-md w-full">
              7: Black
            </div>
            <div className="p-4 bg-slate-500 text-white font-bold rounded-md shadow-md w-full">
              8: Slate
            </div>
            <div className="p-4 bg-red-950 text-white font-bold rounded-md shadow-md w-full h-96">
              9: Red
            </div>
          </div>
        </div>

        {/* Right side: Outlet (Nested Routes) */}
        <div
          className="min-h-screen w-full lg:max-w-[425px] xl:max-w-[550px] fixed right-0 top-0 md:top-28 transition-transform duration-1000 ease-in-out z-50"
          style={{
            transform: isOutletOpen ? "translateX(0)" : "translateX(110%)",
          }}
        >
          <button
            onClick={() => {
              setIsOutletOpen(false);
              setIsMobileMenuOpen(false); // Close mobile menu when closing the outlet panel
              navigate("/dashboard"); // navigate back to /dashboard when closing the outlet panel
            }}
            className="p-3 bg-black text-white hover:text-orange-600 fixed top-6 right-4 rounded-lg z-20"
            aria-label="Close Outlet Panel"
          >
            <FaTimes className="text-2xl" />
          </button>

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
