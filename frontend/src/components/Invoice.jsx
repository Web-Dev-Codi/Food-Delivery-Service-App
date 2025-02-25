import React from 'react'
import { useState,useEffect,useRef } from 'react'
import axios from 'axios'

function Invoice() {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const invoiceRef = useRef();

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8000/cart/getInvoice', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data.data);
                setCart(response.data.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
                setError('Something went wrong');
            }
        };
        fetchCart();
    }
    , []);

    const generatePDF = () => {
        const input = invoiceRef.current;
        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const imgWidth = 190;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
            pdf.save("invoice.pdf");
        });
    };

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>{error}</p>;
    }
    if (!cart) {
        return <p>No items in the cart</p>;
    }

    const { items, totalAmount, finalAmount } = cart;
    const restaurant = items.length > 0 ? items[0].foodItemId.restaurant : null;

    return (
        <div className="flex flex-col items-center p-6">
            <div ref={invoiceRef} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
                {/* Restaurant Details */}
                {restaurant && (
                    <div className="text-center mb-6">
                        <img src={restaurant.logo} alt="Restaurant Logo" className="w-20 h-20 mx-auto rounded-full mb-2" />
                        <h1 className="text-2xl font-bold">{restaurant.name}</h1>
                        <p className="text-gray-600">{restaurant.address}</p>
                        <p className="text-gray-600">📞 {restaurant.contact}</p>
                    </div>
                )}

                <hr className="border-gray-300 my-4" />

                {/* Invoice Title */}
                <h2 className="text-xl font-semibold text-center text-gray-800">Invoice</h2>

                {/* Invoice Table */}
                <div className="overflow-x-auto mt-4">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Item</th>
                                <th className="border border-gray-300 px-4 py-2">Price</th>
                                <th className="border border-gray-300 px-4 py-2">Quantity</th>
                                <th className="border border-gray-300 px-4 py-2">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={index} className="text-center border border-gray-300">
                                    <td className="border border-gray-300 px-4 py-2">{item.foodItemId.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">${item.foodItemId.price}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                                    <td className="border border-gray-300 px-4 py-2">${item.subtotal}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <hr className="border-gray-300 my-4" />

                {/* Total Amount */}
                <div className="flex justify-between items-center text-lg font-semibold text-gray-800">
                    <p>Total Amount:</p>
                    <p>${totalAmount}</p>
                </div>
                <div className="flex justify-between items-center text-lg font-semibold text-gray-800">
                    <p>Final Amount:</p>
                    <p>${finalAmount}</p>
                </div>
            </div>

            {/* Download Button */}
            <button
                onClick={generatePDF}
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
            >
                Download Invoice
            </button>
        </div>
    );
}

export default Invoice;