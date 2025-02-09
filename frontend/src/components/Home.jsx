import { Outlet, Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import { GradientBgTl } from "./design/GradientBgTl";
import { GradientBgTr } from "./design/GradientBgTr";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      {/* Hero Section */}
      <section className="text-center py-8 px-4 flex flex-col items-center">
        {/* 🌟 Centered Logo */}
        <div className="w-40 md:w-56 lg:w-64 h-auto">
          <img
            src={Logo}
            alt="Delicious Ice Cream"
            className="w-full object-contain rounded-xl shadow-lg solar-spin "
          />
        </div>

        {/* Heading */}
        <h1 className="mt-4 text-4xl font-bold bg-gradient-to-r from-yellow-400 to-red-500 inline-block text-transparent bg-clip-text">
          Food Delivery Service
        </h1>
        <p className="text-lg mt-2">
          Bringing delicious food to your doorstep! 🍕🍔🍣
        </p>

        {/* Call-to-Action Button */}
        <Link to="/add-restaurant">
          <button className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 shadow-md">
            🍽️ Add Restaurant
          </button>
        </Link>
      </section>

      {/* Quick Navigation */}
      <section className="flex-grow flex flex-col items-center justify-center animate-fadeIn">
        <h3 className="text-xl font-semibold text-gray-300">Quick Links</h3>
        <nav className="mt-4">
          <ul className="flex flex-wrap justify-center gap-6">
            <li>
              <Link
                to="/restaurants"
                className="text-yellow-400 hover:text-yellow-300 transition-all"
              >
                🍽️ Restaurants
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="text-green-400 hover:text-green-300 transition-all"
              >
                🛒 View Cart
              </Link>
            </li>
            <li>
              <Link
                to="/orders"
                className="text-purple-400 hover:text-purple-300 transition-all"
              >
                📦 Track Orders
              </Link>
            </li>
            <li>
              <Link
                to="/Add"
                className="text-blue-400 hover:text-blue-300 transition-all"
              >
                🔍 Add Menu-admin
              </Link>
            </li>
          </ul>
        </nav>
      </section>
      <GradientBgTl />
      <GradientBgTr />

      {/* React Router Outlet (renders nested components) */}
      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
