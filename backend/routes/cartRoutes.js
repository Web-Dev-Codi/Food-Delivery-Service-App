import { Router } from "express";
import {
  addToCart,
  updateCartItem,
  getCart,
  getAllCarts,
  removeItemFromCart,
} from "../controllers/cartController.js";
import { verifyToken } from "../middleware/auth.js";


const cartRouter = Router();

// All routes are protected - require authentication
/* cartRouter.use(protect);
cartRouter.use(verifyCartOwnership); */
cartRouter.get("/", getAllCarts); // Get cart by user
cartRouter.post("/add", verifyToken, addToCart); // Add or update item
cartRouter.put("/update", verifyToken, updateCartItem); // Update quantity or remove
cartRouter.get("/get", verifyToken, getCart); // Get cart by user

cartRouter.delete("/deleteitem", verifyToken, removeItemFromCart); // Clear cart

export default cartRouter;
