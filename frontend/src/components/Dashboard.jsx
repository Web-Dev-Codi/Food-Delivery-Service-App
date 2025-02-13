import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <nav className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-lg font-semibold mb-4">Admin Panel</h2>
        <ul className="space-y-3">
          <li>
            <Link
              to="restaurants/add"
              className="block p-2 hover:bg-gray-700 rounded"
            >
              ➕ Add Restaurant
            </Link>
          </li>
          <li>
            <Link to="add-menu" className="block p-2 hover:bg-gray-700 rounded">
              🍽 Add Menu
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        <Outlet /> {/* Nested Routes will be displayed here */}
      </div>
    </div>
  );
};

export default Dashboard;
