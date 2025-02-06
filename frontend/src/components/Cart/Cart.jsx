import { useCart } from '../../context/CartContext';
import CartItems from './CartItems';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, clearCart, error, loading } = useCart();
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/menu')}
        >
          Browse Menu
        </Button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <CartItems items={cart.items} />
      <div className="cart-summary">
        <div className="cart-total">
          <h3>Total: ${cart.total?.toFixed(2)}</h3>
        </div>
        <div className="cart-actions">
          <Button
            variant="outlined"
            color="secondary"
            onClick={clearCart}
          >
            Clear Cart
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
