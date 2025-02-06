import PropTypes from 'prop-types';
import { useCart } from '../../context/CartContext';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Typography,
  Card,
  CardMedia,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const CartItems = ({ items }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (itemId, newQuantity) => {
    const quantity = parseInt(newQuantity, 10);
    if (quantity >= 0) {
      updateQuantity(itemId, quantity);
    }
  };

  return (
    <List>
      {items.map((item) => (
        <Card key={item.menuItem._id} className="cart-item-card">
          <ListItem>
            <CardMedia
              component="img"
              className="cart-item-image"
              image={item.menuItem.imageUrl}
              alt={item.menuItem.name}
            />
            <ListItemText
              primary={item.menuItem.name}
              secondary={
                <>
                  <Typography component="span" variant="body2">
                    ${item.price.toFixed(2)} each
                  </Typography>
                  <br />
                  <Typography component="span" variant="body2">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </>
              }
            />
            <TextField
              type="number"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(item.menuItem._id, e.target.value)}
              inputProps={{ min: 0, style: { width: '60px' } }}
              variant="outlined"
              size="small"
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => removeFromCart(item.menuItem._id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </Card>
      ))}
    </List>
  );
};

CartItems.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      menuItem: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
      }).isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default CartItems;
