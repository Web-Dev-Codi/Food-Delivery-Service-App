import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex mt-16 flex-col md:flex-row md:mt-2 min-h-screen">
      {/* Sidebar / Top Navbar for small screens */}
      <nav className="w-full md:w-64 bg-gradient-to-tr from-orange-800 from-20% via-black via-90% to-black p-2 rounded-lg md:p-6 border-b border-neutral-500 md:border-b-0 md:border-l md:mt-10 ">
        <h1 className="text-2xl mt-1 font-bold text-orange-500 mb-1 text-center md:mb-4 md:text-left ">
          Admin Panel
        </h1>
        <ul className="flex md:flex-col justify-center md:space-y-3 space-x-3 md:space-x-0">
          <li>
            <Link
              to="restaurants/add"
              className="block font-bold text-white hover:text-orange-500 transition-colors p-2 md:p-0 md:mb-4 "
            >
              Add Restaurant
            </Link>
          </li>
          <li>
            <Link
              to="add-menu"
              className="block font-bold text-white hover:text-orange-500 transition-colors p-2 md:p-0 md:mb-4"
            >
              Add Menu
            </Link>
          </li>
          <li>
            <Link
              to="coupons"
              className="block font-bold text-white hover:text-orange-500 transition-colors p-2 md:p-0"
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
