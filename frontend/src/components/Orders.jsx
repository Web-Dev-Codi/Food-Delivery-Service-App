import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/order/get`, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token
          },
        });
        console.log(response.data.orders);
        setOrders(response.data.orders);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="flex items-center justify-center w-full md:mt-4 md:pt-24 ">
      <div className="bg-red-800/30 backdrop-blur p-8 rounded-lg shadow-lg w-full max-w-md min-h-screen">
        <div className="block w-full overflow-x-auto">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            Orders
          </h2>
          <p className="text-red-200 text-center">
            {orders.length === 0 && "No orders found!"}
          </p>
          <ul className="grid grid-cols-1 gap-6">
            {orders.map((order) => (
              <li
                key={order._id}
                className="border border-gray-700 bg-black/50 p-4 rounded-xl shadow-lg transition hover:bg-black  "
              >
                {/* User Info */}
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-white py-2">
                    {order?.userId?.name || "Unknown"}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {order?.userId?.email || "Unknown"}
                  </p>
                </div>

                {/* Order Details */}
                <div className="space-y-4">
                  <p className="text-gray-300">
                    <span className="font-semibold text-green-500">
                      Amount:
                    </span>
                    <span className="ml-2">
                      ${order?.paymentId?.amount || "Unknown"}
                    </span>
                  </p>

                  <p className="text-gray-300 flex items-center">
                    <span className="font-semibold text-yellow-500">
                      Payment:
                    </span>
                    <span
                      className={`ml-2 px-2 py-1 rounded-md text-sm font-bold ${
                        order?.paymentId?.status === "Succeeded"
                          ? "bg-green-700 text-white"
                          : "bg-red-700 text-white"
                      }`}
                    >
                      {order?.paymentId?.status || "Unknown"}
                    </span>
                  </p>

                  <p className="text-gray-300 flex items-center">
                    <span className="font-semibold text-green-500">Cart:</span>
                    <span
                      className={`ml-2 px-2 py-1 rounded-md text-sm font-bold ${
                        order?.cartId?.status === "Active"
                          ? "bg-blue-700 text-white"
                          : "bg-gray-700 text-white"
                      }`}
                    >
                      {order?.cartId?.status || "Unknown"}
                    </span>
                  </p>
                </div>

                {/* View Order Button */}
                <button
                  className="mt-4 w-full py-2 bg-orange-600 font-bold text-white rounded-lg hover:bg-orange-500 transition"
                  onClick={() =>
                    navigate(`/dashboard/single-order/${order._id}`)
                  }
                >
                  View Details
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Orders;
