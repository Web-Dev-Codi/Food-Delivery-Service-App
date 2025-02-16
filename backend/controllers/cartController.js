import FoodItem from "../models/FoodItem.js";
import User from "../models/userSchema.js";

// Get Users cart
export const getCart = async (req, res) => {
	try {
		const userId = req.user.userId; // Get user ID from authenticated request

		// Find the user and populate their cart items with food item details
		const user = await User.findById(userId).populate({
			path: "cartItems.foodItem",
			select: "name price description imageUrl availability category",
			model: "FoodItem",
		});

		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		// Calculate total cart value
		const cartTotal = user.cartItems.reduce((total, item) => {
			return total + item.foodItem.price * item.quantity;
		}, 0);

		res.status(200).json({
			success: true,
			cartItems: user.cartItems,
			cartTotal,
			itemCount: user.cartItems.length,
		});
	} catch (error) {
		console.error("Error fetching cart:", error);
		res.status(500).json({
			success: false,
			message: "Error fetching cart",
			error: error.message,
		});
	}
};

// Add item to cart
export const addToCart = async (req, res) => {
	try {
		const { foodItemId , quantity = 1 } = req.body;
		const userId = req.user.userId;

		// Input validation
		if (!foodItemId) {
			return res.status(400).json({
				success: false,
				message: "foodItemId is required",
			});
		}

		// Find user
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		// Find food item
		const foodItem = await FoodItem.findOne({ _id: foodItemId });
		if (!foodItem) {
			return res.status(404).json({
				success: false,
				message: "Food item not found",
			});
		}

		// Check if item already exists in cart
		const existingCartItemIndex = user.cartItems.findIndex(
			(item) => item.foodItem.toString() === foodItemId.toString()
		);

		if (existingCartItemIndex === -1) {
			// Add new item to cart
			user.cartItems.push({
				foodItem: foodItemId, // Store the ObjectId reference
				quantity: quantity,
			});
		} else {
			// Update existing item quantity
			user.cartItems[existingCartItemIndex].quantity = quantity;
		}

		// Save the updated cart
		await user.save();

		// Fetch updated user with populated cart items
		const updatedUser = await User.findById(userId).populate({
			path: "cartItems.foodItem",
			model: "FoodItem",
			select: "name price description imageUrl availability category",
		});

		// Calculate cart total
		const cartTotal = updatedUser.cartItems.reduce((total, item) => {
			return total + item.foodItem.price * item.quantity;
		}, 0);

		res.status(200).json({
			success: true,
			message: "Item added to cart successfully",
			cartItems: updatedUser.cartItems,
			cartTotal,
			itemCount: updatedUser.cartItems.length,
		});
	} catch (error) {
		console.error("Error adding item to cart:", error);
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
		const { foodItemId, quantity } = req.body;
		const userId = req.user.userId;

		// Validate quantity
		if (!quantity || quantity < 0) {
			return res.status(400).json({
				success: false,
				message: "Quantity must be a positive number",
			});
		}

		// Find user and their cart
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		// Find the item in the cart
		const cartItem = user.cartItems.find(
			(item) => item.foodItem.toString() === foodItemId
		);

		if (!cartItem) {
			return res.status(404).json({
				success: false,
				message: "Item not found in cart",
			});
		}

		// If quantity is 0, remove the item from cart
		if (quantity === 0) {
			user.cartItems = user.cartItems.filter(
				(item) => item.foodItem.toString() !== foodItemId
			);
		} else {
			// Update the quantity
			cartItem.quantity = quantity;
		}

		// Save the updated cart
		await user.save();

		// Fetch the updated cart with populated food items
		const updatedUser = await User.findById(userId).populate({
			path: "cartItems.foodItem",
			select: "name price imageUrl availability",
		});

		// Calculate new cart total
		const cartTotal = updatedUser.cartItems.reduce((total, item) => {
			return total + item.foodItem.price * item.quantity;
		}, 0);

		res.status(200).json({
			success: true,
			message:
				quantity === 0
					? "Item removed from cart"
					: "Quantity updated successfully",
			cart: updatedUser.cartItems,
			cartTotal,
			itemCount: updatedUser.cartItems.length,
		});
	} catch (error) {
		console.error("Error updating cart quantity:", error);
		res.status(500).json({
			success: false,
			message: "Error updating cart quantity",
			error: error.message,
		});
	}
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
	try {
		const { foodItemId } = req.params;
		const userId = req.user.userId;

		// Find user and their cart
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		// Check if item exists in cart
		const cartItemIndex = user.cartItems.findIndex(
			(item) => item.foodItem.toString() === foodItemId
		);

		if (cartItemIndex === -1) {
			return res.status(404).json({
				success: false,
				message: "Item not found in cart",
			});
		}

		// Remove the item from cart
		user.cartItems.splice(cartItemIndex, 1);

		// Save the updated cart
		await user.save();

		// Fetch the updated cart with populated food items
		const updatedUser = await User.findById(userId).populate({
			path: "cartItems.foodItem",
			select: "name price imageUrl availability",
		});

		// Calculate new cart total
		const cartTotal = updatedUser.cartItems.reduce((total, item) => {
			return total + item.foodItem.price * item.quantity;
		}, 0);

		res.status(200).json({
			success: true,
			message: "Item removed from cart successfully",
			cart: updatedUser.cartItems,
			cartTotal,
			itemCount: updatedUser.cartItems.length,
		});
	} catch (error) {
		console.error("Error removing item from cart:", error);
		res.status(500).json({
			success: false,
			message: "Error removing item from cart",
			error: error.message,
		});
	}
};

// Clear cart
export const clearCart = async (req, res) => {
	try {
		const userId = req.user.userId;

		// Find user
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		// Clear all items from cart
		user.cartItems = [];

		// Save the updated cart
		await user.save();

		res.status(200).json({
			success: true,
			message: "Cart cleared successfully",
			cart: [],
			cartTotal: 0,
			itemCount: 0,
		});
	} catch (error) {
		console.error("Error clearing cart:", error);
		res.status(500).json({
			success: false,
			message: "Error clearing cart",
			error: error.message,
		});
	}
};
