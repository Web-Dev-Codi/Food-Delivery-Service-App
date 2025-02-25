import { Router } from "express";
import {
  addToCart,
  updateCartItem,
  getCart,
  getAllCarts,
  removeItemFromCart,
  clearCart,
} from "../controllers/cartController.js";
import { verifyToken } from "../middleware/auth.js";

const cartRouter = Router();

cartRouter.get("/", getAllCarts); // Get cart by user
cartRouter.post("/add", verifyToken, addToCart); // Add or update item
cartRouter.put("/update", verifyToken, updateCartItem); // Update quantity or remove
cartRouter.get("/get", verifyToken, getCart); // Get cart by user
cartRouter.delete("/clear", verifyToken, clearCart); // Clear cart by user

cartRouter.delete("/deleteitem", verifyToken, removeItemFromCart); // Remove item from cart

export default cartRouter;
