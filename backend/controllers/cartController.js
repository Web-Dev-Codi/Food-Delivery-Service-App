import Cart from "../models/cartSchema.js";
import FoodItem from "../models/foodItemSchema.js";

// Merge guest cart with user cart
export const mergeGuestCart = async (req, res) => {
	try {
		const { guestCartId, guestCartItems } = req.body;
		const userId = req.user._id;
		const cartId = req.body.cartId;

		console.log("Received guest cart items:", guestCartItems); // Debug log

		if (!guestCartItems || guestCartItems.length === 0) {
			return res.status(400).json({
				success: false,
				message: "Guest cart is empty",
			});
		}

		// Find or create user's cart
		let userCart = await Cart.findOne({ user: userId, isGuestCart: false });
		if (!userCart) {
			userCart = new Cart({
				user: userId,
				isGuestCart: false,
				cartId,
				items: [],
			});
		}

		console.log("Found/Created user cart:", userCart); // Debug log

		// Merge items from guest cart
		for (const guestItem of guestCartItems) {
			if (!guestItem.menuItem) {
				console.log("Skipping invalid guest item:", guestItem);
				continue;
			}

			const menuItemId = guestItem.menuItem._id;
			const existingItemIndex = userCart.items.findIndex(
				(item) => item.menuItem.toString() === menuItemId.toString()
			);

			if (existingItemIndex === -1) {
				// Add new item
				userCart.items.push({
					menuItem: menuItemId,
					name: guestItem.name || "Unknown Item",
					quantity: Number(guestItem.quantity || 1),
					price: Number(guestItem.price || 0),
					imageUrl: guestItem.imageUrl || "",
					description: guestItem.description || "",
				});
			} else {
				// Update existing item quantity
				userCart.items[existingItemIndex].quantity += Number(
					guestItem.quantity || 1
				);
			}
		}

		console.log("Updated cart before save:", userCart); // Debug log

		// Mark the items array as modified
		userCart.markModified("items");

		// Save the updated cart
		await userCart.save();

		// Populate the cart items with menu item details
		const populatedCart = await Cart.findById(userCart._id)
			.populate("items.menuItem")
			.lean(); // Convert to plain JavaScript object

		console.log("Saved cart:", populatedCart); // Debug log

		// Delete the guest cart if it exists in the database
		if (guestCartId) {
			await Cart.findOneAndDelete({
				cartId: guestCartId,
				isGuestCart: true,
			});
		}

		res.status(200).json({
			success: true,
			message: "Cart merged successfully",
			cart: {
				...populatedCart,
				items: populatedCart.items.map((item) => ({
					menuItem: item.menuItem,
					name: item.name,
					quantity: item.quantity,
					price: item.price,
					imageUrl: item.imageUrl,
					description: item.description,
				})),
			},
		});
	} catch (error) {
		console.error("Error merging cart:", error); // Debug log
		res.status(500).json({
			success: false,
			message: "Error merging cart",
			error: error.message,
		});
	}
};

// Get user's cart
export const getCart = async (req, res) => {
	try {
		const userId = req.user.isGuest ? req.user._id : req.user.userId;
		let cart = await Cart.findOne({ user: userId }).populate(
			"items.menuItem"
		);

		if (!cart) {
			cart = await Cart.create({
				user: userId,
				items: [],
				isGuestCart: req.user.isGuest,
			});
		}

		res.status(200).json(cart);
	} catch (error) {
		res.status(500).json({
			message: "Error fetching cart",
			error: error.message,
		});
	}
};

// Add item to cart
export const addToCart = async (req, res) => {
	try {
		const userId = req.user._id;
		const {
			menuItemId,
			quantity = 1,
			name,
			price,
			imageUrl,
			description,
		} = req.body;

		// Validate menu item
		const menuItem = await FoodItem.findById(menuItemId);
		if (!menuItem) {
			return res.status(404).json({ message: "Menu item not found" });
		}

		let cart = await Cart.findOne({ user: userId });
		if (!cart) {
			cart = new Cart({ user: userId, items: [] });
		}

		// Check if item already exists in cart
		const existingItemIndex = cart.items.findIndex(
			(item) => item.menuItem.toString() === menuItemId
		);

		if (existingItemIndex > -1) {
			// Update existing item quantity
			cart.items[existingItemIndex].quantity += Number(quantity);
		} else {
			// Add new item with all details
			cart.items.push({
				menuItem: menuItemId,
				name: name || menuItem.foodItem.name,
				quantity: Number(quantity),
				price: price || menuItem.foodItem.price,
				imageUrl: imageUrl || menuItem.foodItem.imageUrl,
				description: description || menuItem.foodItem.description,
			});
		}

		await cart.save();
		await cart.populate("items.menuItem");

		res.status(200).json({
			success: true,
			cart: cart,
			items: cart.items.map((item) => ({
				menuItem: item.menuItem._id || item.menuItem,
				name: item.menuItem.foodItem.name,
				quantity: item.quantity,
				price: item.menuItem.foodItem.price,
				imageUrl: item.menuItem.foodItem.imageUrl,
				description: item.menuItem.foodItem.description,
			})),
		});
	} catch (error) {
		console.error("Error adding to cart:", error);
		res.status(500).json({
			success: false,
			message: "Error adding item to cart",
			error: error.message,
		});
	}
};

// Update item quantity
export const updateQuantity = async (req, res) => {
	try {
		const userId = req.user._id;
		const { menuItemId, quantity } = req.body;

		if (!menuItemId) {
			return res.status(400).json({
				success: false,
				message: "Menu item ID is required",
			});
		}

		if (quantity < 0) {
			return res.status(400).json({
				success: false,
				message: "Quantity cannot be negative",
			});
		}

		const cart = await Cart.findOne({ user: userId });
		if (!cart) {
			return res.status(404).json({
				success: false,
				message: "Cart not found",
			});
		}

		// Find the item in the cart
		const itemIndex = cart.items.findIndex(
			(item) => item.menuItem.toString() === menuItemId.toString()
		);

		if (itemIndex === -1) {
			return res.status(404).json({
				success: false,
				message: "Item not found in cart",
			});
		}

		if (quantity === 0) {
			// Remove item if quantity is 0
			cart.items.splice(itemIndex, 1);
		} else {
			// Update quantity
			cart.items[itemIndex].quantity = Number(quantity);
		}

		// Mark the items array as modified
		cart.markModified("items");

		// Save the updated cart
		await cart.save();

		// Populate the cart items with menu item details
		const populatedCart = await Cart.findById(cart._id)
			.populate("items.menuItem")
			.lean();

		// Transform the response to match the expected format
		const transformedItems = populatedCart.items.map((item) => ({
			menuItem: item.menuItem._id,
			name: item.name,
			quantity: item.quantity,
			price: item.price,
			imageUrl: item.imageUrl,
			description: item.description,
		}));

		res.status(200).json({
			success: true,
			message: "Cart updated successfully",
			cart: {
				...populatedCart,
				items: transformedItems,
			},
		});
	} catch (error) {
		console.error("Error updating quantity:", error);
		res.status(500).json({
			success: false,
			message: "Error updating quantity",
			error: error.message,
		});
	}
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
	try {
		const userId = req.user._id;
		const { menuItemId } = req.params;

		const cart = await Cart.findOne({ user: userId });
		if (cart) {
			cart.items = cart.items.filter(
				(item) => item.menuItem.toString() !== menuItemId
			);
		} else {
			return res.status(404).json({ message: "Cart not found" });
		}

		await cart.save();
		await cart.populate("items.menuItem");

		res.status(200).json(cart);
	} catch (error) {
		res.status(500).json({
			message: "Error removing item from cart",
			error: error.message,
		});
	}
};

// Clear cart
export const clearCart = async (req, res) => {
	try {
		const userId = req.user._id;

		const cart = await Cart.findOne({ user: userId });
		if (!cart) {
			return res.status(404).json({ message: "Cart not found" });
		}

		cart.items = [];
		await cart.save();
		await cart.populate("items.menuItem");

		res.status(200).json(cart);
	} catch (error) {
		res.status(500).json({
			message: "Error clearing cart",
			error: error.message,
		});
	}
};

// Sync cart
export const syncCart = async (req, res) => {
	try {
		const userId = req.user._id;
		const cart = await Cart.findOne({ user: userId });
		if (!cart) {
			return res.status(404).json({ message: "Cart not found" });
		}
		await cart.populate("items.menuItem");
		res.status(200).json(cart);
	} catch (error) {
		res.status(500).json({
			message: "Error syncing cart",
			error: error.message,
		});
	}
};
