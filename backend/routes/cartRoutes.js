import { Router } from "express";
import {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  mergeGuestCart,
  syncCart,
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
cartRouter.get("/cart", getCart);

// Merge guest cart with user cart
cartRouter.post("/cart/merge", mergeGuestCart);

// Sync cart with backend
cartRouter.post("/sync", syncCart);

// Add item to cart
cartRouter.post("/add", verifyCartItem, verifyCartQuantity, addToCart);

// Update item quantity
cartRouter.put(
  "/update-quantity",
  verifyCartItem,
  verifyCartQuantity,
  updateQuantity,
);

// Remove item from cart
cartRouter.delete("/remove/:menuItemId", verifyCartItem, removeFromCart);

// Clear entire cart
cartRouter.delete("/clear", clearCart);

export default cartRouter;
