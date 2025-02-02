import { useCart } from "../context/CartContext";

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

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div>
			<h2>Shopping Cart</h2>
			{cart.map((item) => (
				<div key={item._id}>
					<h3>{item.product.name}</h3>
					<p>Price: ${item.product.price}</p>
					<input
						type="number"
						value={item.quantity}
						onChange={(e) =>
							updateQuantity(item._id, parseInt(e.target.value))
						}
						min="1"
					/>
					<button onClick={() => removeFromCart(item._id)}>
						Remove
					</button>
				</div>
			))}
			<div>Total: ${total}</div>
			<button onClick={clearCart}>Clear Cart</button>
		</div>
	);
}

export default Cart;
