import { Router } from "express";
import {
	getCart,
	addToCart,
	updateCartItem,
	removeFromCart,
	clearCart,
	transferGuestCart,
} from "../controllers/cartController.js";
import {
	protect,
	verifyCartOwnership,
	verifyCartItem,
	verifyCartQuantity,
} from "../middleware/authMiddleware.js";

const cartRouter = Router();

// All routes are protected - require authentication
cartRouter.use(protect);
cartRouter.use(verifyCartOwnership);

// Get user's cart
cartRouter.get("/:cartId", getCart);

// Add item to cart
cartRouter.post("/add", verifyCartItem, verifyCartQuantity, addToCart);

// Update item quantity
cartRouter.put("/update", verifyCartItem, verifyCartQuantity, updateCartItem);

// Remove item from cart
cartRouter.delete("/:cartId/item/:foodItemId", verifyCartItem, removeFromCart);

// Clear entire cart
cartRouter.delete("/:cartId", clearCart);

// Merge guest cart with user cart
cartRouter.post("/transfer", transferGuestCart);

export default cartRouter;
