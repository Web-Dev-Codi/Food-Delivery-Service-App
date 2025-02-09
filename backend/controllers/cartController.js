import Cart from "../models/Cart.js";
import FoodItem from "../models/FoodItem.js";

// Get cart by ID
export const getCart = async (req, res) => {
	try {
		const { cartId } = req.params;
		const cart = await Cart.findById(cartId).populate("items.foodItem");
		if (!cart) {
			return res.status(404).json({ message: "Cart not found" });
		}
		res.json(cart);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Add item to cart
export const addToCart = async (req, res) => {
	try {
		const { cartId, foodItemId, quantity } = req.body;

		const foodItem = await FoodItem.findById(foodItemId);
		if (!foodItem) {
			return res.status(404).json({ message: "Food item not found" });
		}

		let cart = await Cart.findById(cartId);
		if (!cart) {
			// Create new cart for guest or user
			cart = new Cart({
				_id: cartId,
				userId: req.body.userId || cartId, // Use cartId as userId for guests
				isGuest: !req.body.userId,
				items: [],
				total: 0,
			});
		}

		// Check if item already exists in cart
		const existingItemIndex = cart.items.findIndex(
			(item) => item.foodItem.toString() === foodItemId
		);

		if (existingItemIndex > -1) {
			// Update quantity if item exists
			cart.items[existingItemIndex].quantity += quantity;
		} else {
			// Add new item
			cart.items.push({
				foodItem: foodItemId,
				quantity,
				price: foodItem.price,
			});
		}

		// Update total
		cart.total = cart.items.reduce((total, item) => {
			return total + item.price * item.quantity;
		}, 0);

		await cart.save();
		res.json(cart);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Update item quantity
export const updateCartItem = async (req, res) => {
	try {
		const { cartId, foodItemId, quantity } = req.body;

		const cart = await Cart.findById(cartId);
		if (!cart) {
			return res.status(404).json({ message: "Cart not found" });
		}

		const itemIndex = cart.items.findIndex(
			(item) => item.foodItem.toString() === foodItemId
		);

		if (itemIndex === -1) {
			return res.status(404).json({ message: "Item not found in cart" });
		}

		if (quantity <= 0) {
			cart.items.splice(itemIndex, 1);
		} else {
			cart.items[itemIndex].quantity = quantity;
		}

		cart.total = cart.items.reduce((total, item) => {
			return total + item.price * item.quantity;
		}, 0);

		await cart.save();
		res.json(cart);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
	try {
		const { cartId, foodItemId } = req.params;

		const cart = await Cart.findById(cartId);
		if (!cart) {
			return res.status(404).json({ message: "Cart not found" });
		}

		cart.items = cart.items.filter(
			(item) => item.foodItem.toString() !== foodItemId
		);

		cart.total = cart.items.reduce((total, item) => {
			return total + item.price * item.quantity;
		}, 0);

		await cart.save();
		res.json(cart);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Clear cart
export const clearCart = async (req, res) => {
	try {
		const { cartId } = req.params;

		const cart = await Cart.findById(cartId);
		if (!cart) {
			return res.status(404).json({ message: "Cart not found" });
		}

		cart.items = [];
		cart.total = 0;

		await cart.save();
		res.json(cart);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Transfer guest cart to user cart
export const transferGuestCart = async (req, res) => {
	try {
		const { guestCartId, userId } = req.body;

		const guestCart = await Cart.findById(guestCartId);
		if (!guestCart) {
			return res.status(404).json({ message: "Guest cart not found" });
		}

		let userCart = await Cart.findOne({ userId, isGuest: false });
		if (!userCart) {
			userCart = new Cart({
				userId,
				isGuest: false,
				items: guestCart.items,
				total: guestCart.total,
			});
		} else {
			// Merge guest cart items with user cart
			guestCart.items.forEach((guestItem) => {
				const existingItemIndex = userCart.items.findIndex(
					(item) =>
						item.foodItem.toString() ===
						guestItem.foodItem.toString()
				);

				if (existingItemIndex > -1) {
					userCart.items[existingItemIndex].quantity +=
						guestItem.quantity;
				} else {
					userCart.items.push(guestItem);
				}
			});

			userCart.total = userCart.items.reduce((total, item) => {
				return total + item.price * item.quantity;
			}, 0);
		}

		await userCart.save();
		await Cart.findByIdAndDelete(guestCartId);

		res.json(userCart);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
