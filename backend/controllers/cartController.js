import User from "../models/userSchema.js";
import FoodItem from "../models/foodItemSchema.js";

// Get user's cart
export const getCart = async (req, res) => {
	const userId = req.params.userId || req.body.userId;
	const user = await User.findById(userId)
		.populate("cart.items.foodItemId")
		.exec();

	try {
		if (!user) {
			return res.status(404).json({
				message: "User not found",
			});
		}
	} catch (error) {
		res.status(500).json({
			message: "An error occurred while fetching cart",
			error: error.message,
		});
	}

	res.status(200).json(user.cart);
};

// Add item to cart
export const addToCart = async (req, res) => {
	const userId = req.params.userId || req.body.userId;
	const { foodItemId, quantity } = req.body;

	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({
				message: "User not found",
			});
		}

		const foodItem = await FoodItem.findById(foodItemId);
		if (!foodItem) {
			return res.status(404).json({
				message: "Food item not found",
			});
		}

		user.cart.items.push({ foodItemId, quantity });
		await user.save();
	} catch (error) {
		res.status(500).json({
			message: "An error occurred while adding item to cart",
			error: error.message,
		});
	}
};

// Update item quantity
export const updateQuantity = async (req, res) => {};

// Remove item from cart
export const removeFromCart = async (req, res) => {};

// Clear cart
export const clearCart = async (req, res) => {};

// Sync cart
export const syncCart = async (req, res) => {};
 