import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function SingleOrder() {
  const [order, setOrder] = useState({});
  const { id } = useParams();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/order/get/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.order);
        setOrder(response.data.order);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrder();
  }, [id]);

  if (!order) {
    return <p>LOading.....</p>;
  }

  return (
    <div className="flex items-center justify-center w-full md:mt-4 md:pt-24 ">
      <div className="bg-red-800/30 backdrop-blur p-8 rounded-lg shadow-lg w-full max-w-md min-h-screen">
        <div className="block w-full overflow-x-auto">
          <h2 className="text-2xl font-extrabold mb-6 text-center text-white uppercase tracking-wider relative">
            Order Details
            <span className="block w-40 h-1 bg-orange-500 mx-auto mt-1 rounded-full"></span>
          </h2>

          {/* User Details */}
          <div className="border border-gray-700 p-4 rounded-lg mb-4 bg-black/80">
            <h3 className="text-xl font-semibold text-amber-400 mb-2">
              User Information
            </h3>
            <p className="text-gray-300">
              <strong>Name:</strong>
              <span className="text-xl text-green-400 px-2">
                {order.userId?.name}
              </span>
            </p>
            <p className="text-gray-300">
              <strong>Email:</strong>
              <span className="text-sm text-green-400 italic px-2">
                {order.userId?.email}
              </span>
            </p>
            {order.userId?.address && (
              <p className="text-gray-300">
                <strong>Address:</strong> {order.userId.address.street},{" "}
                {order.userId.address.city}, {order.userId.address.state} -{" "}
                {order.userId.address.zipCode}
              </p>
            )}
            <p className="text-gray-300">
              <strong>Contact:</strong> {order.userId?.contact}
            </p>
          </div>

          {/* Payment Details */}
          <div className="border border-gray-700 p-4 rounded-lg mb-4 bg-black/80">
            <h3 className="text-xl font-semibold text-amber-400 mb-2">
              Payment Details
            </h3>
            <p className="text-green-400 mb-2 ">
              <strong>Amount:</strong>
              <span className="text-xl text-amber-400 font-semibold px-2">
                €{order.paymentId?.amount}
              </span>
            </p>
            <p className="text-gray-300 flex items-center">
              <strong>Status:</strong>
              <span
                className={`ml-2 px-3 py-1 rounded-md text-sm font-bold ${
                  order.paymentId?.status === "Succeeded"
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {order.paymentId?.status}
              </span>
            </p>
          </div>

          {/* Ordered Items */}
          <div className="border border-gray-700 p-4 rounded-lg mb-4 bg-black/80">
            <h3 className="text-xl font-semibold text-amber-400 mb-2">
              Ordered Items
            </h3>
            {order.cartId?.items?.length > 0 ? (
              <ul className="space-y-4">
                {order.cartId.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center border-b border-gray-600 pb-4"
                  >
                    {/* Food Item Image */}
                    {item.foodItemId?.imageUrl && (
                      <img
                        src={item.foodItemId.imageUrl}
                        alt={item.foodItemId.name}
                        className="w-20 h-20 rounded-lg mr-4 object-cover"
                      />
                    )}
                    <div>
                      <p className="text-lg font-semibold text-white">
                        {item.foodItemId?.name}
                      </p>
                      <p className="text-gray-300">
                        Price: ${item.foodItemId?.price}
                      </p>
                      <p className="text-gray-300">Quantity: {item.quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-300">No items in cart.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleOrder;
