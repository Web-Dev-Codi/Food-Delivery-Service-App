import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/order/get", {
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
    <div className="flex items-center justify-center w-full md:mt-3 ">
      <div className="bg-red-800/30 backdrop-blur p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="block w-full overflow-x-auto">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            Orders
          </h2>
          <p className="text-red-200 text-center">
            {orders.length === 0 && "No orders found!"}
          </p>
          <ul className="space-y-4">
            {orders.map((order) => (
              <li
                key={order._id}
                className="border border-gray-300 bg-neutral-800/10 rounded-lg shadow-md p-4"
              >
                <p className="text-green-600">
                  User:{" "}
                  <span className="text-white">
                    {order?.userId?.name || "Unknown"}
                  </span>
                </p>

                <p className="text-green-600">
                  Email:{" "}
                  <span className="text-white">
                    {order?.userId?.email || "Unknown"}
                  </span>
                </p>
                <p className="text-green-600">
                  Amount:{" "}
                  <span className="text-white">
                    ${order?.paymentId?.amount || "Unknown"}
                  </span>
                </p>
                <p className="text-green-600">
                  Payment Status:
                  <span className="text-white">
                    {order?.paymentId?.status || "Unknown"}
                  </span>
                </p>
                <p className="text-green-600">
                  Cart Status:
                  <span className="text-white">{order?.cartId?.status}</span>
                </p>
                <button
                  className="w-full py-2 bg-orange-700 font-bold text-neutral-300 rounded-lg hover:bg-orange-600 hover:text-white"
                  onClick={() => {
                    navigate(`/dashboard/single-order/${order._id}`);
                  }}
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
