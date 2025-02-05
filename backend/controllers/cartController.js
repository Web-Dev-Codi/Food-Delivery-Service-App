import mongoose from "mongoose";
import Cart from "../models/cartSchema.js";
import MenuItem from "../models/menuItemSchema.js";
import User from "../models/userSchema.js";

// Helper Functions
const createNewCart = async ({ userId = null, guestId = null }) => {
	const cartData = {
		items: [],
		isGuestCart: !userId,
		...(userId ? { user: userId } : { guestId }),
	};
	const cart = new Cart(cartData);
	await cart.save();
	return cart;
};

const findUserCart = async (userId) => {
	return await Cart.findOne({ user: userId, isGuestCart: false })
		.populate("items.menuItem")
		.populate("user", "email name");
};

const findGuestCart = async (guestId) => {
	return await Cart.findOne({ guestId, isGuestCart: true }).populate(
		"items.menuItem"
	);
};

const validateMenuItem = async (menuItemId) => {
	const menuItem = await MenuItem.findById(menuItemId);
	if (!menuItem) {
		throw new Error(`Menu item not found: ${menuItemId}`);
	}
	return menuItem;
};

const formatCartItem = (menuItem, quantity) => ({
	menuItem: menuItem._id,
	name: menuItem.name,
	quantity: Number(quantity),
	price: menuItem.price,
	imageUrl: menuItem.imageUrl,
	description: menuItem.description,
});

// Controller Functions

/**
 * Get cart for authenticated user or guest
 */
export const getCart = async (req, res) => {
	try {
		const { user, guestId } = req;
		let cart;

		if (user?._id) {
			cart = await findUserCart(user._id);
		} else if (guestId) {
			cart = await findGuestCart(guestId);
		}

		if (!cart) {
			cart = await createNewCart({
				userId: user?._id,
				guestId: guestId,
			});
		}

		res.status(200).json({
			success: true,
			cart,
		});
	} catch (error) {
		console.error("Get cart error:", error);
		res.status(500).json({
			success: false,
			message: "Failed to retrieve cart",
			error: error.message,
		});
	}
};

// backend/controllers/cartController.js
// backend/controllers/cartController.js
export const convertGuestToUserCart = async (req, res) => {
	try {
		const { items } = req.body;
		const userId = req.user._id;

		// Validate items and check menu item existence
		const validItems = await Promise.all(
			items.map(async (item) => {
				if (!mongoose.Types.ObjectId.isValid(item.menuItem)) {
					console.warn("Invalid menuItem ID format:", item.menuItem);
					return null;
				}

				// Verify menu item exists
				const menuItemExists = await MenuItem.exists({
					_id: item.menuItem,
				});
				if (!menuItemExists) {
					console.warn("Missing menu item ID:", item.menuItem);
					return null;
				}

				return {
					menuItem: new mongoose.Types.ObjectId(item.menuItem),
					quantity: Math.max(1, Number(item.quantity) || 1),
				};
			})
		).then((results) => results.filter(Boolean));

		if (validItems.length === 0) {
			console.warn('Invalid cart items:', items);
			return res.status(400).json({
				success: false,
				message: 'No valid menu items found in cart',
				invalidIds: items.map(item => item.menuItem)
			});
		}

		// Create new user cart with validated items
		const newCart = new Cart({
			cartId: `cart_${Date.now()}_${Math.random()
				.toString(36)
				.substring(2, 10)}`,
			user: userId,
			isGuestCart: false,
			items: validItems,
		});

		const savedCart = await newCart.save();
		const populatedCart = await Cart.findById(savedCart._id)
			.populate({
				path: "items.menuItem",
				select: "name price imageUrl",
			})
			.exec();

		res.status(201).json({
			success: true,
			message: "Cart converted successfully",
			cart: populatedCart,
		});
	} catch (error) {
		console.error("Cart conversion failed:", error);
		res.status(500).json({
			success: false,
			message: "Cart conversion failed",
			error: error.message,
		});
	}
};

/**
 * Add item to cart
 */
export const addToCart = async (req, res) => {
	try {
		const { menuItemId, quantity } = req.body;
		const { user, guestId } = req;

		// Validate menu item
		const menuItem = await validateMenuItem(menuItemId);

		// Find or create cart
		let cart = user?._id
			? await findUserCart(user._id)
			: await findGuestCart(guestId);

		if (!cart) {
			cart = await createNewCart({
				userId: user?._id,
				guestId: guestId,
			});
		}

		// Check if item already exists
		const existingItemIndex = cart.items.findIndex(
			(item) => item.menuItem.toString() === menuItemId
		);

		if (existingItemIndex > -1) {
			cart.items[existingItemIndex].quantity += Number(quantity);
		} else {
			cart.items.push(formatCartItem(menuItem, quantity));
		}

		await cart.save();
		await cart.populate("items.menuItem");

		res.status(200).json({
			success: true,
			cart,
		});
	} catch (error) {
		console.error("Add to cart error:", error);
		res.status(500).json({
			success: false,
			message: "Failed to add item to cart",
			error: error.message,
		});
	}
};

/**
 * Update item quantity in cart
 */
export const updateCartItem = async (req, res) => {
	try {
		const { menuItemId, quantity } = req.body;
		const { user, guestId } = req;

		let cart = user?._id
			? await findUserCart(user._id)
			: await findGuestCart(guestId);

		if (!cart) {
			return res.status(404).json({
				success: false,
				message: "Cart not found",
			});
		}

		const itemIndex = cart.items.findIndex(
			(item) => item.menuItem.toString() === menuItemId
		);

		if (itemIndex === -1) {
			return res.status(404).json({
				success: false,
				message: "Item not found in cart",
			});
		}

		if (quantity <= 0) {
			cart.items.splice(itemIndex, 1);
		} else {
			cart.items[itemIndex].quantity = Number(quantity);
		}

		await cart.save();
		await cart.populate("items.menuItem");

		res.status(200).json({
			success: true,
			cart,
		});
	} catch (error) {
		console.error("Update cart item error:", error);
		res.status(500).json({
			success: false,
			message: "Failed to update cart item",
			error: error.message,
		});
	}
};

/**
 * Remove item from cart
 */
export const deleteCartItemByMenuItemId = async (req, res) => {
	try {
		const { menuItemId } = req.params;
		const { user, guestId } = req;

		let cart = user?._id
			? await findUserCart(user._id)
			: await findGuestCart(guestId);

		if (!cart) {
			return res.status(404).json({
				success: false,
				message: "Cart not found",
			});
		}

		const itemIndex = cart.items.findIndex(
			(item) => item.menuItem.toString() === menuItemId
		);

		if (itemIndex === -1) {
			return res.status(404).json({
				success: false,
				message: "Item not found in cart",
			});
		}

		// Remove the item at the found index
		cart.items.splice(itemIndex, 1);

		await cart.save();
		await cart.populate("items.menuItem");

		res.status(200).json({
			success: true,
			cart,
		});
	} catch (error) {
		console.error("Delete cart item error:", error);
		res.status(500).json({
			success: false,
			message: "Failed to delete item from cart",
			error: error.message,
		});
	}
};

/**
 * Clear cart
 */
export const clearCart = async (req, res) => {
	try {
		const { user, guestId } = req;

		let cart = user?._id
			? await findUserCart(user._id)
			: await findGuestCart(guestId);

		if (!cart) {
			return res.status(404).json({
				success: false,
				message: "Cart not found",
			});
		}

		cart.items = [];
		await cart.save();

		res.status(200).json({
			success: true,
			cart,
		});
	} catch (error) {
		console.error("Clear cart error:", error);
		res.status(500).json({
			success: false,
			message: "Failed to clear cart",
			error: error.message,
		});
	}
};

/**
 * Merge guest cart with user cart after authentication
 */
export const mergeGuestCartToUserCartByID = async (req, res) => {
	try {
		const { guestCartId } = req.params;
		const userId = req.user._id;

		console.log("Attempting to merge cart:", {
			guestCartId,
			userId,
			time: new Date().toISOString(),
		});

		// Find the guest cart by its cartId field
		const guestCart = await Cart.findOne({ cartId: guestCartId }).populate(
			"items.menuItem"
		);
		console.log("Found guest cart:", guestCart ? "yes" : "no");

		if (!guestCart) {
			console.log("Guest cart not found with ID:", guestCartId);
			return res.status(404).json({
				success: false,
				message: "Guest cart not found",
				details: { guestCartId },
			});
		}

		// Find or create user cart
		let userCart = await findUserCart(userId);
		if (!userCart) {
			userCart = await createNewCart({ userId });
		}

		if (guestCart.items.length > 0) {
			// Merge items from guest cart to user cart
			for (const guestItem of guestCart.items) {
				const existingItemIndex = userCart.items.findIndex(
					(item) =>
						item.menuItem.toString() ===
						guestItem.menuItem.toString()
				);

				if (existingItemIndex > -1) {
					// If item exists, add quantities
					userCart.items[existingItemIndex].quantity +=
						guestItem.quantity;
				} else {
					// If item doesn't exist, add it with a new _id
					userCart.items.push({
						...guestItem.toObject(),
						_id: new mongoose.Types.ObjectId(),
					});
				}
			}

			await userCart.save();
			await userCart.populate("items.menuItem");

			// Delete the guest cart after successful merge
			await Cart.findOneAndDelete({ cartId: guestCartId });
		}

		res.status(200).json({
			success: true,
			cart: userCart,
			message: "Guest cart successfully merged with user cart",
		});
	} catch (error) {
		console.error("Merge cart error:", error);
		res.status(500).json({
			success: false,
			message: "Failed to merge carts",
			error: error.message,
		});
	}
};
const cleanMenuItemId = (id) => {
	if (!id) return null;
	return typeof id === "string" ? id.replace(/[^a-zA-Z0-9]/g, "") : id;
};

// Helper function to find menu item
const findMenuItem = async (item, session) => {
	const menuItemId = cleanMenuItemId(item.menuItem || item.menuItemId);

	// Try to find by ID first
	if (menuItemId) {
		try {
			const menuItem = await MenuItem.findById(menuItemId).session(
				session
			);
			if (menuItem) return menuItem;
		} catch (err) {
			console.log(
				`Error finding menu item by ID ${menuItemId}:`,
				err.message
			);
		}
	}

	// Try to find by name as fallback
	if (item.name) {
		return await MenuItem.findOne({
			name: { $regex: new RegExp(`^${item.name}$`, "i") },
		}).session(session);
	}

	return null;
};
