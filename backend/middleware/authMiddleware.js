import { verifyToken } from "./auth.js";
// import mongoose from "mongoose";
// import jwt from "jsonwebtoken";

// Export verifyToken as protect for compatibility
export const protect = verifyToken;

// Re-export verifyToken for backward compatibility
export { verifyToken };

// Verify user ownership of resource
export const verifyOwnership = (req, res, next) => {
	if (!req.user) {
		return res.status(401).json({
			message: "Authentication required",
		});
	}

	const resourceUserId = req.params.userId || req.body.userId;

	if (req.user.userId !== resourceUserId && req.user.role !== "admin") {
		return res.status(403).json({
			message: "Access denied. You can only access your own resources.",
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
	const { foodItemId } = req.body;

	if (!foodItemId) {
		return res.status(400).json({
			message: "Food item ID is required",
		});
	}

	next();
};

// Verify cart quantity
export const verifyCartQuantity = (req, res, next) => {
	const { quantity } = req.body;

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
