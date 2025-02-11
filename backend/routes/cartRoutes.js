import { Router } from "express";
import {
	getCart,
	addToCart,
	updateQuantity,
	removeFromCart,
	clearCart,
	syncCart,
} from "../controllers/cartController.js";
// import { protect, verifyCartOwnership } from "../middleware/authMiddleware.js";

const cartRouter = Router();

// All routes are protected - require authentication
// cartRouter.use(protect);
// cartRouter.use(verifyCartOwnership);

// Get user's cart
cartRouter.get("/", getCart);

// Sync cart with backend
cartRouter.post("/sync", syncCart);

// Add item to cart
cartRouter.post("/add", addToCart);

// Update item quantity
cartRouter.put("/update/:menuItemId", updateQuantity);

// Remove item from cart
cartRouter.delete("/remove/:menuItemId", removeFromCart);

// Clear entire cart
cartRouter.delete("/clear", clearCart);

export default cartRouter;
