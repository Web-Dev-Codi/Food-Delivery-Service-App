import mongoose from 'mongoose';
import Cart from "../models/cartSchema.js";
import MenuItem from "../models/menuItemSchema.js";
import User from "../models/userSchema.js";

// Helper function to clean menu item IDs
const cleanMenuItemId = (id) => {
    if (!id) return null;
    return typeof id === 'string' ? id.replace(/[^a-zA-Z0-9]/g, '') : id;
};

// Helper function to find menu item
const findMenuItem = async (item, session) => {
    const menuItemId = cleanMenuItemId(item.menuItem || item.menuItemId);

    // Try to find by ID first
    if (menuItemId) {
        try {
            const menuItem = await MenuItem.findById(menuItemId).session(session);
            if (menuItem) return menuItem;
        } catch (err) {
            console.log(`Error finding menu item by ID ${menuItemId}:`, err.message);
        }
    }

    // Try to find by name as fallback
    if (item.name) {
        return await MenuItem.findOne({
            name: { $regex: new RegExp(`^${item.name}$`, 'i') }
        }).session(session);
    }

    return null;
};

// Merge guest cart with user cart
export const mergeGuestCart = async (req, res) => {
    try {
        console.log('=== Starting Cart Merge Process ===');

        // Validate request
        const { guestCartId, items } = req.body;

        if (!req.user?._id || !guestCartId || !Array.isArray(items)) {
            return res.status(400).json({
                message: 'Invalid request data',
                details: !req.user?._id ? 'Authentication required' :
                         !guestCartId ? 'Guest cart ID required' :
                         'Invalid items format'
            });
        }

        console.log('Processing cart merge:', {
            userId: req.user._id,
            guestCartId,
            itemCount: items.length
        });

        // Find or create user cart
        let userCart = await Cart.findOne({
            user: req.user._id,
            isGuestCart: false
        });

        if (!userCart) {
            console.log('Creating new user cart...');
            userCart = new Cart({
                user: req.user._id,
                isGuestCart: false,
                cartId: `cart_${Date.now()}_${req.user._id}`,
                items: []
            });

            // Save the cart first to get its _id
            await userCart.save();

            // Update user's cartId reference
            await User.findByIdAndUpdate(
                req.user._id,
                { cartId: userCart._id }
            );

            console.log('Created new cart and updated user reference:', {
                cartId: userCart.cartId,
                _id: userCart._id
            });
        } else {
            console.log('Found existing user cart:', {
                cartId: userCart.cartId,
                _id: userCart._id,
                itemCount: userCart.items.length
            });
        }

        // Process items
        const processedItems = [];
        const errors = [];

        for (const item of items) {
            try {
                const menuItem = await findMenuItem(item);

                if (!menuItem) {
                    throw new Error(`Menu item not found: ${item.name || item.menuItem}`);
                }

                processedItems.push({
                    menuItem: menuItem._id,
                    name: menuItem.name,
                    quantity: Number(item.quantity) || 1,
                    price: menuItem.price,
                    imageUrl: menuItem.imageUrl,
                    description: menuItem.description
                });
            } catch (err) {
                console.error('Error processing item:', err);
                errors.push({
                    item: item.name || item.menuItem,
                    error: err.message
                });
            }
        }

        // Update cart items
        for (const item of processedItems) {
            const existingItemIndex = userCart.items.findIndex(
                i => i.menuItem.toString() === item.menuItem.toString()
            );

            if (existingItemIndex !== -1) {
                userCart.items[existingItemIndex].quantity += item.quantity;
            } else {
                userCart.items.push(item);
            }
        }

        // Save all changes
        await userCart.save();

        // Delete guest cart
        await Cart.findOneAndDelete(
            { cartId: guestCartId, isGuestCart: true }
        );

        // Get final cart with populated items
        const finalCart = await Cart.findById(userCart._id)
            .populate('items.menuItem')
            .lean();

        console.log('Cart merge completed successfully:', {
            processedItems: processedItems.length,
            errors: errors.length,
            finalItemCount: finalCart.items.length
        });

        res.status(200).json({
            cart: finalCart,
            processedItems: processedItems.length,
            errors: errors.length ? errors : undefined
        });

    } catch (error) {
        console.error('Cart merge error:', error);
        res.status(500).json({
            message: 'Failed to merge carts',
            error: error.message
        });
    } finally {
        if (mongoose.connection.session) {
            try {
                await mongoose.connection.session.endSession();
            } catch (sessionError) {
                console.error('Error ending session:', sessionError);
            }
        }
    }
}

// Get user's cart
export const getCart = async (req, res) => {
    try {
        console.log('=== Fetching User Cart ===');
        console.log('User:', req.user);

        if (!req.user || !req.user._id) {
            console.log('No user found in request');
            return res.status(401).json({ message: 'Authentication required' });
        }

        // First try to find cart by user ID
        let cart = await Cart.findOne({ user: req.user._id, isGuestCart: false })
            .populate('items.menuItem');

        if (!cart) {
            console.log('No cart found by user ID, checking user document for cartId...');
            // Try to find cart ID from user document
            const user = await User.findById(req.user._id);
            if (user && user.cartId) {
                console.log('Found cartId in user document:', user.cartId);
                cart = await Cart.findById(user.cartId).populate('items.menuItem');
            }
        }

        if (!cart) {
            console.log('Creating new cart for user...');
            // Create new cart
            cart = await Cart.create({
                user: req.user._id,
                items: [],
                isGuestCart: false,
                cartId: `cart_${Math.random().toString(36).substring(2, 15)}`
            });

            // Update user's cartId reference
            await User.findByIdAndUpdate(req.user._id, { cartId: cart._id });
            console.log('Created new cart:', cart._id);
        } else {
            console.log('Found existing cart:', cart._id);
        }

        console.log('Returning cart with items:', cart.items?.length || 0);
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error in getCart:', error);
        res.status(500).json({
            message: "Error fetching cart",
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
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

        let cart = await Cart.findOne({ user: userId, isGuestCart: false });
        if (!cart) {
            cart = new Cart({
                user: userId,
                items: [],
                isGuestCart: false,
                cartId: `cart_${Date.now()}_${userId}`
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

        if (!menuItemId) {
            return res.status(400).json({ message: "Menu item ID is required" });
        }

        if (quantity < 0) {
            return res.status(400).json({ message: "Quantity cannot be negative" });
        }

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({
                user: userId,
                items: [],
                isGuestCart: req.user.isGuest
            });
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
        console.error('Error in updateQuantity:', error);
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
