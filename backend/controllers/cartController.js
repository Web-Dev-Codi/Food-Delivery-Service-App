import Cart from "../models/cartSchema.js";
import FoodItem from "../models/FoodItem.js";

export const getAllCarts = async (req, res) => {
	try {
		const carts = await Cart.find()
			.populate("userId", "name email address contact")
			.populate("items.foodItemId", "name price");

		if (carts.length === 0) {
			return res.status(404).json({ message: "No carts found" });
		}

		res.status(200).json({
			message: "Carts fetched successfully",
			data: carts,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Get Users cart
export const getCart = async (req, res) => {
	try {
		console.log("User ID in getCart:", req.userId); // Log req.userId to debug

		const userId = req.userId; // userId is already available after the verifyToken middleware

		if (!userId) {
			return res.status(400).json({ message: "User ID is required" });
		}
		const cart = (await Cart.findOne({ userId }).populate(
			"items.foodItemId",
			"name price description imageUrl category"
		)) || { items: [], totalAmount: 0, finalAmount: 0 };

		if (!cart) {
			return res.status(404).json({ message: "Cart not found" });
		}
		res.status(200).json({
			message: "Cart fetched successfully",
			data: cart,
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

export const getCartForInvoice = async (req, res) => {
  try {
    console.log("User ID in getCart:", req.userId);  // Log req.userId to debug

    const userId = req.userId;  // userId is already available after the verifyToken middleware
    
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.foodItemId",
      select: "name price description imageUrl category restaurant", // ✅ Fetch food item details
      populate: { path: "restaurant", select: "name location contact" } // ✅ Fetch restaurant details
    })
    .select("items totalAmount finalAmount")
  
    
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json({ message: "Cart fetched successfully", data: cart });
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
		const { items } = req.body;
		const userId = req.userId;

		if (!items || !Array.isArray(items) || items.length === 0) {
			return res.status(400).json({
				success: false,
				message: "User ID and items are required",
			});
		}

		// Loop through items to check each foodItemId and quantity
		for (let item of items) {
			if (!item.foodItemId || item.quantity < 1) {
				return res.status(400).json({
					success: false,
					message:
						"Food item ID and quantity are required for each item",
				});
			}
		}

		let cart = await Cart.findOne({ userId });
		if (!cart) {
			cart = await Cart.create({ userId, items: [] });
		}

		items.forEach((item) => {
			// Ensure quantity is a number and default to 1 if invalid
			item.quantity = Number(item.quantity) || 1;

			const existingItem = cart.items.find(
				(i) => i.foodItemId.toString() === item.foodItemId
			);
			if (existingItem) {
				existingItem.quantity += item.quantity;
			} else {
				cart.items.push(item);
			}
		});

		await cart.save();
		console.log("Cart after adding item:", cart); // Log cart to debug
		res.status(200).json({
			message: "Item(s) added to cart successfully",
			data: cart,
		});
	} catch (error) {
		console.error("Error adding to cart:", error);
		res.status(500).json({
			success: false,
			message: "Error adding to cart",
			error: error.message,
		});
	}
};

// Update item quantity
export const updateCartItem = async (req, res) => {
	try {
		const { userId } = req;
		console.log("User ID in updateCartItem:", userId); // Log userId to debug
		const { items } = req.body;

		// Check for required fields
		if (!Array.isArray(items) || items.length === 0) {
			return res.status(400).json({
				success: false,
				message: " items array are required",
			});
		}

		// Find the cart for the user
		const cart = await Cart.findOne({ userId });
		if (!cart) {
			return res.status(404).json({ message: "Cart not found" });
		}

		for (let itemToUpdate of items) {
			const { foodItemId, quantity } = itemToUpdate;

			if (!foodItemId || typeof quantity !== "number" || quantity < 1) {
				return res.status(400).json({
					success: false,
					message:
						"foodItemId and a valid quantity (greater than 0) are required",
				});
			}

			// Find the item in the cart
			const cartItem = cart.items.find(
				(item) => item.foodItemId.toString() === foodItemId.toString()
			);

			if (cartItem) {
				cartItem.quantity = quantity;
			}
		}
		await cart.save();
		console.log("Cart after updating item:", cart); // Log cart to debug

		res.status(200).json({
			message: "Cart updated successfully",
			data: cart,
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

// Remove specific item from user cart
export const removeItemFromCart = async (req, res) => {
	try {
		const userId = req.userId; // Ensure you're using req.userId consistently
		console.log("User ID in removeItemFromCart:", userId);

		if (!userId) {
			return res.status(400).json({ message: "User ID is required" });
		}

		const { items } = req.body;
		if (!items || !Array.isArray(items) || items.length === 0) {
			return res
				.status(400)
				.json({ message: "Food item(s) are required" });
		}

		const cart = await Cart.findOne({ userId });
		if (!cart || cart.items.length === 0) {
			return res
				.status(404)
				.json({ message: "Cart is empty or not found" });
		}

		// Remove each item based on foodItemId
		items.forEach(({ foodItemId }) => {
			cart.items = cart.items.filter(
				(item) => item.foodItemId.toString() !== foodItemId
			);
		});

		await cart.save();
		console.log("Cart after removing item:", cart); // Log cart to debug
		return res.status(200).json({
			success: true,
			message: "Item(s) removed from cart successfully",
			data: cart,
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
		const userId = req.userId;

		if (!userId) {
			return res.status(400).json({ message: "User ID is required" });
		}

		const cart = await Cart.findOne({ userId });
		if (!cart) {
			return res.status(404).json({ message: "Cart not found" });
		}

		// Clear cart items and reset amounts
		cart.items = [];
		cart.totalAmount = 0;
		cart.discount = 0;
		cart.finalAmount = 0;
		cart.appliedCoupon = null;

		await cart.save();

		res.status(200).json({
			success: true,
			message: "Cart cleared successfully",
			data: cart,
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
