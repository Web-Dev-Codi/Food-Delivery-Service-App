import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Toggle for mobile menu

  return (
    <header className="bg-gradient-to-b from-[#4436BD] via-[#33246C] to-[#050913] text-neutral-300 py-4 px-6 flex justify-between items-center rounded-lg shadow-lg relative">
      {/* 🍽️ Logo */}
      <Link to="/" className="text-xl font-bold text-yellow-400">
        🍽️ Food Delivery
      </Link>

      {/* The Toggle btn */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-2xl z-50"
      >
        {menuOpen ? "✖" : "☰"}
      </button>

      {/* Navigation Links set to hidden  */}
      <nav
        className={`absolute top-16 left-0 w-full bg-gradient-to-b from-[#050913] via-[#392679] to-[#050913] md:bg-transparent md:static md:w-auto md:flex md:space-x-6 
          ${
            menuOpen ? "flex flex-col items-center py-4 z-40" : "hidden"
          } transition-all`}
      >
        <Link
          to="/restaurants"
          className="block md:inline-block px-4 py-2 hover:text-red-600"
          onClick={() => setMenuOpen(false)}
        >
          Restaurants
        </Link>
        <Link
          to="/cart"
          className="block md:inline-block px-4 py-2 hover:text-yellow-300"
          onClick={() => setMenuOpen(false)}
        >
          Cart
        </Link>
        <Link
          to="/"
          className="block md:inline-block px-4 py-2 hover:text-green-500"
          onClick={() => setMenuOpen(false)}
        >
          Where to?
        </Link>

        {/* Click me to LoginForm.jsx */}
        <Link
          to="/login"
          className="block md:hidden bg-blue-600 text-white hover:bg-white hover:text-neutral-800 text-center w-full py-2 mt-2 rounded-lg"
          onClick={() => setMenuOpen(false)}
        >
          Login
        </Link>
      </nav>

      {/* Desktop Login Button */}
      <Link
        to="/login"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all hidden md:block"
      >
        Login
      </Link>
    </header>
  );
};

export default Header;
