import Cart from "../models/cartSchema.js";
import MenuItem from "../models/menuItemSchema.js";

// Merge guest cart with user cart
export const mergeGuestCart = async (req, res) => {
	try {
		const { guestCartId, guestCartItems } = req.body;
		const userId = req.user._id;

		// Find or create user's cart
		let userCart = await Cart.findOne({ user: userId, isGuestCart: false });
		if (!userCart) {
			userCart = new Cart({
				user: userId,
				isGuestCart: false,
				items: []
			});
		}

		// Merge items from guest cart
		if (guestCartItems && Array.isArray(guestCartItems)) {
			for (const guestItem of guestCartItems) {
				const existingItem = userCart.items.find(
					item => item.menuItem.toString() === guestItem.menuItem.toString()
				);

				if (existingItem) {
					existingItem.quantity += guestItem.quantity;
				} else {
					// Add all item details when adding to cart
					userCart.items.push({
						menuItem: guestItem.menuItem,
						name: guestItem.name,
						quantity: guestItem.quantity,
						price: guestItem.price,
						imageUrl: guestItem.imageUrl,
						description: guestItem.description
					});
				}
			}
		}

		await userCart.save();
		await userCart.populate('items.menuItem');

		// Delete the guest cart if it exists in the database
		if (guestCartId) {
			await Cart.findOneAndDelete({ cartId: guestCartId, isGuestCart: true });
		}

		res.status(200).json(userCart);
	} catch (error) {
		res.status(500).json({
			message: 'Error merging cart',
			error: error.message
		});
	}
};

// Get user's cart
export const getCart = async (req, res) => {
	try {
		const userId = req.user.isGuest ? req.user._id : req.user.userId;
		let cart = await Cart.findOne({ user: userId }).populate("items.menuItem");

		if (!cart) {
			cart = await Cart.create({
				user: userId,
				items: [],
				isGuestCart: req.user.isGuest
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
		const { menuItemId, quantity = 1 } = req.body;

		// Validate menu item
		const menuItem = await MenuItem.findById(menuItemId);
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
			cart.items[existingItemIndex].quantity += quantity;
		} else {
			// Add new item with all details
			cart.items.push({
				menuItem: menuItemId,
				name: menuItem.name,
				quantity,
				price: menuItem.price,
				imageUrl: menuItem.imageUrl,
				description: menuItem.description
			});
		}

		await cart.save();
		await cart.populate("items.menuItem");

		res.status(200).json(cart);
	} catch (error) {
		res.status(500).json({
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

		if (quantity < 0) {
			return res
				.status(400)
				.json({ message: "Quantity cannot be negative" });
		}

		const cart = await Cart.findOne({ user: userId });
		if (!cart) {
			return res.status(404).json({ message: "Cart not found" });
		}

		const itemIndex = cart.items.findIndex(
			(item) => item.menuItem.toString() === menuItemId
		);

		if (itemIndex === -1) {
			return res.status(404).json({ message: "Item not found in cart" });
		}

		if (quantity === 0) {
			// Remove item if quantity is 0
			cart.items.splice(itemIndex, 1);
		} else {
			// Update quantity
			cart.items[itemIndex].quantity = quantity;
		}

		await cart.save();
		await cart.populate("items.menuItem");

		res.status(200).json(cart);
	} catch (error) {
		res.status(500).json({
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
		if (!cart) {
			return res.status(404).json({ message: "Cart not found" });
		}

		cart.items = cart.items.filter(
			(item) => item.menuItem.toString() !== menuItemId
		);

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

		res.status(200).json(cart);
	} catch (error) {
		res.status(500).json({
			message: "Error clearing cart",
			error: error.message,
		});
	}
};
