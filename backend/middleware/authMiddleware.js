import { verifyToken } from './auth.js';

// Export verifyToken as protect for compatibility
export const protect = verifyToken;

// Re-export verifyToken for backward compatibility
export { verifyToken };

// Check if user has admin role
export const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Authentication required",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied. Admin privileges required.",
    });
  }

  next();
};

// Check if user has restaurant owner role
export const isRestaurantOwner = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Authentication required",
    });
  }

  if (req.user.role !== "restaurant_owner") {
    return res.status(403).json({
      message: "Access denied. Restaurant owner privileges required.",
    });
  }

  next();
};

// Verify user ownership of resource
export const verifyOwnership = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Authentication required",
    });
  }

  const resourceUserId = req.params.userId || req.body.userId;
  if (req.user.id !== resourceUserId && req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied. You don't have permission to access this resource.",
    });
  }

  next();
};

// Check if user has moderator role
export const isModerator = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Authentication required",
    });
  }

  if (req.user.role !== "moderator") {
    return res.status(403).json({
      message: "Access denied. Moderator privileges required.",
    });
  }

  next();
};

// Check if user has customer role
export const isCustomer = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Authentication required",
    });
  }

  if (req.user.role !== "customer") {
    return res.status(403).json({
      message: "Access denied. Customer privileges required.",
    });
  }

  next();
};

// Cart-specific middleware
export const verifyCartOwnership = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Authentication required to access cart",
    });
  }

  const cartUserId = req.params.userId || req.body.userId || req.user.id;
  if (req.user.id !== cartUserId) {
    return res.status(403).json({
      message: "Access denied. You can only access your own cart.",
    });
  }

  next();
};

// Verify cart item exists
export const verifyCartItem = async (req, res, next) => {
  try {
    const menuItemId = req.params.menuItemId || req.body.menuItemId;
    if (!menuItemId) {
      return res.status(400).json({
        message: "Menu item ID is required",
      });
    }

    // You can add additional checks here if needed
    // For example, checking if the menu item exists in your database

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Error verifying cart item",
      error: error.message,
    });
  }
};

// Verify cart quantity
export const verifyCartQuantity = (req, res, next) => {
  const quantity = req.body.quantity;
  
  if (typeof quantity !== 'number' || quantity < 0) {
    return res.status(400).json({
      message: "Invalid quantity. Must be a non-negative number.",
    });
  }

  next();
};
