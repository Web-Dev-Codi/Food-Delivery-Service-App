import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function SingleOrder() {
  const [order, setOrder] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8000/order/get/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
    <div className="flex items-center justify-center w-full md:mt-3 ">
      <div className="bg-red-800/30 backdrop-blur p-8 rounded-lg shadow-lg w-full max-w-md min-h-screen">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Order Details
        </h2>

        {/* User Details */}
        <div className="border border-gray-300 p-2.5 rounded mb-3.5">
          <h3>User Information</h3>
          <p>
            <strong>Name:</strong> {order.userId?.name}
          </p>
          <p>
            <strong>Email:</strong> {order.userId?.email}
          </p>
          {order.userId?.address && (
            <p>
              <strong>Address:</strong>
              {order.userId.address.street}, {order.userId.address.city},
              {order.userId.address.state} - {order.userId.address.zipCode}
            </p>
          )}
          <p>
            <strong>Contact:</strong> {order.userId?.contact}
          </p>
        </div>

        {/* Payment Details */}
        <div className="border border-gray-300 p-2.5 rounded mb-3.5">
          <h3>Payment Details</h3>
          <p>
            <strong>Amount:</strong> ${order.paymentId?.amount}
          </p>
          <p>
            <strong>Status:</strong> {order.paymentId?.status}
          </p>
        </div>

        {/* Food Items List */}
        <div className="border border-gray-300 p-2.5 rounded mb-3.5">
          <h3>Ordered Items</h3>
          {order.cartId?.items?.length > 0 ? (
            order.cartId.items.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  borderBottom: "1px solid #ddd",
                  paddingBottom: "10px",
                }}
              >
                {/* Food Item Image */}
                {item.foodItemId?.imageUrl && (
                  <img
                    src={item.foodItemId.imageUrl}
                    alt={item.foodItemId.name}
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "5px",
                      marginRight: "10px",
                    }}
                  />
                )}
                <div>
                  <p>
                    <strong>{item.foodItemId?.name}</strong>
                  </p>
                  <p>Price: ${item.foodItemId?.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No items in cart.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleOrder;
