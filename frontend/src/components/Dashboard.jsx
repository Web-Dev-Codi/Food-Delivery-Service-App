import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar / Top Navbar for small screens */}
      <nav className="w-full md:w-64 bg-gradient-to-tr from-orange-800 from-20% via-black via-60% to-black text-white p-4 md:p-6 border-b md:border-b-0 md:border-r border-neutral-600">
        <h2 className="text-lg font-semibold mb-4 text-center md:text-left">
          Admin Panel
        </h2>
        <ul className="flex md:flex-col justify-center md:space-y-3 space-x-3 md:space-x-0">
          <li>
            <Link
              to="restaurants/add"
              className="block p-2 hover:bg-orange-500/30 rounded"
            >
              ➕ Add Restaurant
            </Link>
          </li>
          <li>
            <Link
              to="add-menu"
              className="block p-2 hover:bg-orange-500/30 rounded"
            >
              🍽 Add Menu
            </Link>
          </li>
          <li>
            <Link
              to="coupons"
              className="block p-2 hover:bg-orange-500/30 rounded"
            >
              💸 Add Coupons
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content Area - Centered */}
      <div className="flex-1 flex items-center justify-center p-6 min-h-screen ">
        <div className="min-h-screen  w-full max-w-3xl">
          <Outlet /> {/* Nested Routes will be displayed here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
