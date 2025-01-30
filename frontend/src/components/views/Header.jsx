import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUserCircle, FaBars } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold tracking-wide">
          🍔 FoodDelivery
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6 text-lg">
          <Link to="/" className="hover:text-gray-200 transition">
            Home
          </Link>
          <Link to="/menu" className="hover:text-gray-200 transition">
            Menu
          </Link>
          <Link to="/orders" className="hover:text-gray-200 transition">
            Orders
          </Link>
          <Link
            to="/cart"
            className="hover:text-gray-200 transition flex items-center"
          >
            Cart <FaShoppingCart className="ml-1" />
          </Link>
          <Link
            to="/profile"
            className="hover:text-gray-200 transition flex items-center"
          >
            Profile <FaUserCircle className="ml-1" />
          </Link>
        </nav>

        {/* Sign-in & Admin Panel */}
        <div className="hidden md:flex space-x-4">
          <Link
            to="/login"
            className="bg-white text-red-500 px-4 py-2 rounded-md font-semibold hover:bg-gray-200 transition"
          >
            Sign In
          </Link>
          <Link
            to="/admin"
            className="bg-black text-yellow-400 px-4 py-2 rounded-md font-semibold hover:bg-gray-800 transition"
          >
            Admin Panel
          </Link>
        </div>

        {/* Mobile Menu (Hamburger) */}
        <button className="md:hidden text-2xl">
          <FaBars />
        </button>
      </div>
    </header>
  );
};

export default Header;
