import { Router } from "express";
import {
	getCart,
	addToCart,
	updateQuantity,
	removeFromCart,
	clearCart,
	mergeGuestCart,
} from "../controllers/cartController.js";
import {
	verifyGuestOrAuth,
	verifyCartOwnership,
	verifyCartItem,
	verifyCartQuantity,
} from "../middleware/authMiddleware.js";

const cartRouter = Router();

// All routes require either guest ID or authentication
cartRouter.use(verifyGuestOrAuth);
cartRouter.use(verifyCartOwnership);

// Get user's cart
cartRouter.get("/cart", getCart);

// Add item to cart
cartRouter.post("/cart/add", verifyCartQuantity, addToCart);

// Update item quantity
cartRouter.put("/cart/update-quantity", verifyCartQuantity, updateQuantity);

// Remove item from cart
cartRouter.delete("/cart/remove/:menuItemId", removeFromCart);

// Clear cart
cartRouter.delete("/cart/clear", clearCart);

// Merge guest cart with user cart - requires authentication
cartRouter.post(
	"/cart/merge",
	verifyGuestOrAuth,
	async (req, res, next) => {
		console.log("Merge request received:", {
			body: req.body,
			headers: req.headers,
		});
		next();
	},
	mergeGuestCart
);

// Sync cart with backend
cartRouter.post("/cart/sync", verifyGuestOrAuth, async (req, res) => {
	try {
		const userId = req.user._id;
		const { items, cartId } = req.body;

		if (!items || !Array.isArray(items)) {
			return res.status(400).json({ message: "Invalid cart data" });
		}

		// Find or create cart
		let cart = await Cart.findOne({
			$or: [{ user: userId, isGuestCart: false }, { cartId: cartId }],
		});

		if (!cart) {
			cart = new Cart({
				user: userId,
				isGuestCart: req.user.isGuest || false,
				cartId: cartId || `cart_${Date.now()}_${userId}`,
				items: [],
			});
		}

		// Update cart items
		cart.items = items.map((item) => ({
			menuItem: item.menuItem,
			name: item.name,
			quantity: item.quantity,
			price: item.price,
			imageUrl: item.imageUrl,
			description: item.description,
		}));

		// Save cart
		await cart.save();

		// If user is authenticated, update their cartId reference
		if (!req.user.isGuest) {
			await User.findByIdAndUpdate(userId, { cartId: cart._id });
		}

		await cart.populate("items.menuItem");

		res.status(200).json(cart);
	} catch (error) {
		res.status(500).json({
			message: "Error syncing cart",
			error: error.message,
		});
	}
});

// // Add item to cart
// cartRouter.post("/add", verifyCartItem, verifyCartQuantity, addToCart);

// // Update item quantity
// cartRouter.put(
// 	"/update-quantity",
// 	verifyCartItem,
// 	verifyCartQuantity,
// 	updateQuantity
// );

// // Remove item from cart
// cartRouter.delete("/remove/:menuItemId", verifyCartItem, removeFromCart);

// // Clear entire cart
// cartRouter.delete("/clear", clearCart);

export default cartRouter;
