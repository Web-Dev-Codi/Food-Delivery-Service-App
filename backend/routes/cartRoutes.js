import { Router } from "express";
import {
	getCart,
	addToCart,
	updateQuantity,
	removeFromCart,
	clearCart,
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

// Sync cart with backend
cartRouter.post("/sync", async (req, res) => {
	try {
		const userId = req.user.isGuest ? req.user._id : req.user.userId;
		const { items } = req.body;

		let cart = await Cart.findOne({ user: userId });
		if (!cart) {
			cart = new Cart({
				user: userId,
				items: [],
				isGuestCart: req.user.isGuest
			});
		}

		cart.items = items;
		await cart.save();
		await cart.populate("items.menuItem");

		res.status(200).json(cart);
	} catch (error) {
		res.status(500).json({
			message: "Error syncing cart",
			error: error.message
		});
	}
});

// Add item to cart
cartRouter.post("/add", verifyCartItem, verifyCartQuantity, addToCart);

// Update item quantity
cartRouter.put(
	"/update-quantity",
	verifyCartItem,
	verifyCartQuantity,
	updateQuantity
);

// Remove item from cart
cartRouter.delete("/remove/:menuItemId", verifyCartItem, removeFromCart);

// Clear entire cart
cartRouter.delete("/clear", clearCart);

export default cartRouter;
