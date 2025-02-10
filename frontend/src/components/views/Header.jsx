import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Toggle for mobile menu

  return (
    <header className="bg-gradient-to-b from-[#4436BD] via-[#33246C] to-[#050913] text-neutral-300 py-4 px-6 flex justify-between items-center rounded-lg shadow-lg">
      {/* 🍽️ Logo */}
      <Link to="/" className="text-xl font-bold text-yellow-400">
        🍽️ Food Delivery
      </Link>

      {/* 🏗️ Mobile Menu Toggle */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-2xl"
      >
        {menuOpen ? "✖" : "☰"}
      </button>

      {/* 📌 Navigation Links (Hidden on Mobile, Shown on Larger Screens) */}
      <nav
        className={`absolute top-16 left-0 w-full bg-gray-800 md:bg-transparent md:static md:w-auto md:flex space-x-6 
          ${menuOpen ? "block" : "hidden"} md:block transition-all`}
      >
        <Link
          to="/restaurants"
          className="block md:inline-block px-4 py-2 hover:text-yellow-300"
        >
          Restaurants
        </Link>
        <Link
          to="/cart"
          className="block md:inline-block px-4 py-2 hover:text-green-300"
        >
          Cart
        </Link>
        <Link
          to="/orders"
          className="block md:inline-block px-4 py-2 hover:text-purple-300"
        >
          Orders
        </Link>
      </nav>

      {/* 👤 Login Button */}
      <button
        onClick={() => setShowLogin(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all hidden md:block"
      >
        Login
      </button>

      {/* 📱 Show Login Button Inside Mobile Menu */}
      {menuOpen && (
        <button
          onClick={() => {
            setShowLogin(true);
            setMenuOpen(false);
          }}
          className="block md:hidden bg-blue-600 text-white text-center w-full py-2 mt-2"
        >
          Login
        </button>
      )}

      {/* 🖥️ Modal for Login Form */}
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
