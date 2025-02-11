import { verifyToken } from "./auth.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

// Export verifyToken as protect for compatibility
export const protect = verifyToken;

// Re-export verifyToken for backward compatibility
export { verifyToken };

// Verify either guest ID or auth token
export const verifyGuestOrAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const guestId = req.headers["x-guest-id"];

  // If there's a guest ID, use that
  if (guestId) {
    req.user = {
      _id: guestId,
      isGuest: true,
    };
    return next();
  }

  // Otherwise, try auth token
  if (!authHeader) {
    return res.status(401).json({
      message:
        "No authentication provided. Please provide a guest ID or auth token.",
    });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "Malformed token. Ensure you are using 'Bearer <token>'.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { ...decoded, isGuest: false };
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token.",
      error: err.message,
    });
  }
};

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

  if (req.user._id !== resourceUserId && req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied. You can only access your own resources.",
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
  // Skip ownership check for guest carts
  if (req.user.isGuest) {
    return next();
  }

  // For authenticated users, verify cart ownership
  const cartUserId = req.params.userId || req.body.userId || req.user._id;

  if (req.user._id !== cartUserId && req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied. You can only access your own cart.",
    });
  }

  next();
};

// Verify cart item exists
export const verifyCartItem = (req, res, next) => {
  const menuItemId = req.body.menuItemId || req.params.menuItemId;

  if (!menuItemId) {
    return res.status(400).json({
      message: "Menu item ID is required",
    });
  }

  // For guest carts, we don't need to verify the ObjectId format
  if (!req.user.isGuest && !mongoose.Types.ObjectId.isValid(menuItemId)) {
    return res.status(400).json({
      message: "Invalid menu item ID format",
    });
  }

  next();
};

// Verify cart quantity
export const verifyCartQuantity = (req, res, next) => {
  const quantity = req.body.quantity;

  if (
    typeof quantity !== "undefined" &&
    (quantity < 1 || !Number.isInteger(quantity))
  ) {
    return res.status(400).json({
      message: "Quantity must be a positive integer",
    });
  }

  next();
};
