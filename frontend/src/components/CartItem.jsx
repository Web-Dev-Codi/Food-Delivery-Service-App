import PropTypes from "prop-types";
import { useCart } from "./context/CartContext";

function CartItem({ product }) {
	const { addToCart, loading } = useCart();

	const handleAddToCart = () => {
		addToCart({
			productId: product._id,
			quantity: 1,
		});
	};

	return (
		<div>
			<h3>{product.name}</h3>
			<p>${product.price}</p>
			<button
				onClick={handleAddToCart}
				disabled={loading}>
				Add to Cart
			</button>
		</div>
	);
}

CartItem.propTypes = {
	product: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
	}).isRequired,
};

export default CartItem;
