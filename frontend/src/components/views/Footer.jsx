import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white text-center py-6">
      <div className="container mx-auto px-6">
        {/* Quick Links */}
        <nav className="flex justify-center space-x-6 text-lg font-medium">
          <Link to="/" className="hover:text-gray-200 transition">
            Home
          </Link>
          <Link to="/menu" className="hover:text-gray-200 transition">
            Menu
          </Link>
          <Link to="/orders" className="hover:text-gray-200 transition">
            Orders
          </Link>
          <Link to="/about" className="hover:text-gray-200 transition">
            About Us
          </Link>
          <Link to="/contact" className="hover:text-gray-200 transition">
            Contact
          </Link>
        </nav>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="text-2xl hover:text-gray-300 transition">
            <FaFacebookF />
          </a>
          <a href="#" className="text-2xl hover:text-gray-300 transition">
            <FaTwitter />
          </a>
          <a href="#" className="text-2xl hover:text-gray-300 transition">
            <FaInstagram />
          </a>
        </div>

        {/* Copyright */}
        <p className="mt-4 text-sm">
          © {new Date().getFullYear()} FoodDelivery. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
