import express from 'express';
import { 
    getCart, 
    addToCart, 
    updateQuantity, 
    removeFromCart, 
    clearCart 
} from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes are protected - require authentication
router.use(protect);

// Get user's cart
router.get('/', getCart);

// Add item to cart
router.post('/add', addToCart);

// Update item quantity
router.put('/update-quantity', updateQuantity);

// Remove item from cart
router.delete('/remove/:menuItemId', removeFromCart);

// Clear entire cart
router.delete('/clear', clearCart);

export default router;
