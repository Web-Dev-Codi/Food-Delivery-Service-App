import { Router } from "express";
import {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  syncCart,
} from "../controllers/cartController.js";
import {
  verifyCartOwnership,
  verifyCartItem,
  verifyCartQuantity,
  verifyGuestOrAuth,
} from "../middleware/authMiddleware.js";

const cartRouter = Router();

// All routes can be accessed by either authenticated users or guests
cartRouter.use(verifyGuestOrAuth);
cartRouter.use(verifyCartOwnership);

// Get user's cart
cartRouter.get("/", getCart);

// Sync cart with database
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
