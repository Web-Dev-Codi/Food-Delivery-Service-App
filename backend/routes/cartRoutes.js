import { Router } from "express";
import {
	getCart,
	addToCart,
	updateCartItem,
	deleteCartItemByMenuItemId,
	clearCart,
	mergeGuestCartToUserCartByID,
	convertGuestToUserCart,
} from "../controllers/cartController.js";
import {
	verifyGuestOrAuth,
	verifyCartItem,
	verifyCartQuantity,
} from "../middleware/authMiddleware.js";

const cartRouter = Router();

// All routes require either guest ID or authentication
cartRouter.use(verifyGuestOrAuth);

// Get cart
cartRouter.get("/", getCart);

// Convert guest cart to user cart
cartRouter.post("/convert-to-user", convertGuestToUserCart);

// Add item to cart
cartRouter.post(
	"/add/:menuItemId",
	verifyCartItem,
	verifyCartQuantity,
	addToCart
);

// Update item quantity
cartRouter.put(
	"/update/:menuItemId",
	verifyCartItem,
	verifyCartQuantity,
	updateCartItem
);

// Delete item from cart by menuItemId
cartRouter.delete(
	"/delete/:menuItemId",
	verifyCartItem,
	deleteCartItemByMenuItemId
);

// Clear entire cart
cartRouter.delete("/clear/", clearCart);

// Merge guest cart with user cart by cart ID
cartRouter.post("/merge/:guestCartId", mergeGuestCartToUserCartByID);

export default cartRouter;
