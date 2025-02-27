
import React from 'react'
import axios  from 'axios'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'





function Orders() {
   const [orders, setOrders] = useState([]);
   const navigate = useNavigate();


   useEffect(() => {
    const fetchOrders = async () => {
        try{
            const token = localStorage.getItem('token');
       const response = await axios.get('http://localhost:8000/order/get', {
        headers: {
            Authorization: `Bearer ${token}`, // Attach token
        },
    });
       console.log(response.data.orders);
         setOrders(response.data.orders);
       }
       catch(err){
              console.log(err);
         }
    }
    fetchOrders();
    },[]);
   


    return (
        <div>
            <h1>Orders</h1>
            <ul>
                {orders.map((order) => (
                    <li key={order._id}>
                        <p>User: {order?.userId?.name || "Unknown"}</p>
                        <p>Email: {order?.userId?.email || "Unknown"}</p>
                        <p>Amount: ${order?.paymentId?.amount || "Unknown"}</p>
                        <p>Payment Status: {order?.paymentId?.status || "Unknown"}</p>
                        <p>Cart Status: {order?.cartId?.status}</p>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => {
                                navigate(`/single-order/${order._id}`);
                            }}
                        >
                            View Details
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Orders;