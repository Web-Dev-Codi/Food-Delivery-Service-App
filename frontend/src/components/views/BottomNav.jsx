import { Link } from "react-router-dom";
import { FaHome, FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";

const BottomNav = () => {
  return (
    <nav className="fixed bottom-4 sm:bottom-10 left-0 w-full bg-neutral-800/20 backdrop-blur shadow-md py-4 sm:py-6 rounded-full flex justify-around mb-12 ">
      <Link to="/dashboard">
        <FaHome className="text-lg sm:text-xl text-gray-400 hover:text-white" />
      </Link>
      <Link to="/restaurants">
        <FaSearch className="text-lg sm:text-xl text-gray-400 hover:text-white" />
      </Link>
      <Link to="/menu">
        <FaShoppingCart className="text-lg sm:text-xl text-gray-400 hover:text-white" />
      </Link>
      <Link to="/login">
        <FaUser className="text-lg sm:text-xl text-gray-400 hover:text-white" />
      </Link>
    </nav>
  );
};

export default BottomNav;
