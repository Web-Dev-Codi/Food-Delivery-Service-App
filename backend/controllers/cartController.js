import Cart from "../models/cartSchema.js";
import MenuItem from "../models/menuItemSchema.js";

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
    const userId = req.user.isGuest ? req.user._id : req.user.userId;
    const { menuItemId, quantity = 1 } = req.body;

    // Validate menu item
    const menuItem = await MenuItem.findById(menuItemId);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ 
        user: userId, 
        items: [],
        isGuestCart: req.user.isGuest 
      });
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.menuItem.toString() === menuItemId
    );

    if (existingItemIndex > -1) {
      // Update existing item quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        menuItem: menuItemId,
        quantity,
        price: menuItem.price,
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
    const userId = req.user.isGuest ? req.user._id : req.user.userId;
    const { menuItemId, quantity } = req.body;

    if (quantity < 0) {
      return res.status(400).json({ message: "Quantity cannot be negative" });
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
      message: "Error updating cart item quantity",
      error: error.message,
    });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.isGuest ? req.user._id : req.user.userId;
    const { menuItemId } = req.params;

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

    cart.items.splice(itemIndex, 1);
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
    const userId = req.user.isGuest ? req.user._id : req.user.userId;
    
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

// Sync cart with database
export const syncCart = async (req, res) => {
  try {
    const userId = req.user.isGuest ? req.user._id : req.user.userId;
    const { items } = req.body;

    if (!Array.isArray(items)) {
      return res.status(400).json({ message: "Items must be an array" });
    }

    // Validate all menu items exist
    const menuItemIds = items.map((item) => item.menuItem);
    const menuItems = await MenuItem.find({ _id: { $in: menuItemIds } });

    if (menuItems.length !== menuItemIds.length) {
      return res.status(400).json({ message: "Some menu items not found" });
    }

    // Create price lookup for validation
    const pricesById = menuItems.reduce((acc, item) => {
      acc[item._id.toString()] = item.price;
      return acc;
    }, {});

    // Validate and normalize items
    const normalizedItems = items.map((item) => ({
      menuItem: item.menuItem,
      quantity: Math.max(1, item.quantity),
      price: pricesById[item.menuItem.toString()],
    }));

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ 
        user: userId, 
        items: normalizedItems,
        isGuestCart: req.user.isGuest 
      });
    } else {
      cart.items = normalizedItems;
    }

    await cart.save();
    await cart.populate("items.menuItem");

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({
      message: "Error syncing cart",
      error: error.message,
    });
  }
};
