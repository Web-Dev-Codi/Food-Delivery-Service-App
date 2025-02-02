import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Cart() {
	const {
		cart,
		total,
		loading,
		error,
		removeFromCart,
		updateQuantity,
		clearCart,
	} = useCart();
	const navigate = useNavigate();

	useEffect(() => {
		// Check if user is authenticated
		const token = localStorage.getItem("token");
		if (!token) {
			navigate("/login");
		}
	}, [navigate]);

	if (loading) return <div className="text-center p-4">Loading...</div>;
	if (error) return (
		<div className="text-center p-4 text-red-600">
			{error}
			{!localStorage.getItem("token") && (
				<button 
					className="ml-2 text-blue-600 underline"
					onClick={() => navigate("/login")}
				>
					Login
				</button>
			)}
		</div>
	);

	if (!cart || cart.length === 0) {
		return (
			<div className="text-center p-4">
				<h2 className="text-xl font-bold mb-4">Your Cart</h2>
				<p>Your cart is empty</p>
			</div>
		);
	}

	return (
		<div className="p-4">
			<h2 className="text-2xl font-bold mb-4">Your Cart</h2>
			<div className="space-y-4">
				{cart.map((item) => (
					<div key={item._id} className="border p-4 rounded-lg shadow">
						<h3 className="text-lg font-semibold">{item.menuItem.name}</h3>
						<p className="text-gray-600">Price: ${item.menuItem.price}</p>
						<div className="flex items-center mt-2">
							<input
								type="number"
								value={item.quantity}
								onChange={(e) =>
									updateQuantity(item._id, parseInt(e.target.value))
								}
								min="1"
								className="w-20 p-1 border rounded mr-2"
							/>
							<button 
								onClick={() => removeFromCart(item._id)}
								className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
							>
								Remove
							</button>
						</div>
					</div>
				))}
			</div>
			<div className="mt-6">
				<div className="text-xl font-bold">Total: ${total.toFixed(2)}</div>
				<button 
					onClick={clearCart}
					className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
				>
					Clear Cart
				</button>
			</div>
		</div>
	);
}

export default Cart;
