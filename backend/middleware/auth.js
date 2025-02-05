import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
	const authHeader = req.headers.authorization;
	console.log('Auth Check - Headers:', req.headers);
	console.log('Auth Check - Path:', req.path);

	// For cart operations, allow guest access with a temporary user ID
	if (req.path.startsWith("/cart")) {
		const guestId = req.headers["x-guest-id"];
		if (guestId) {
			console.log('Using guest ID:', guestId);
			req.user = {
				_id: guestId,
				userId: guestId,
				isGuest: true,
			};
			return next();
		}
	}

	if (!authHeader) {
		return res.status(401).json({
			message: "No token provided or token expired or invalid token",
		});
	}

	const token = authHeader.split(" ")[1];
	if (!token) {
		return res.status(401).json({
			message: "Malformed token. Ensure you are using 'Bearer <token>'.",
		});
	}

	try {
		// Verify the token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		console.log('Decoded token:', decoded);

		// Ensure we have a userId from the token
		if (!decoded.userId && !decoded._id) {
			console.error('No userId found in token');
			return res.status(401).json({
				message: 'Invalid token format - no user ID found'
			});
		}

		// Structure the user object consistently
		req.user = {
			...decoded,
			_id: decoded.userId || decoded._id,
			userId: decoded.userId || decoded._id,
			isGuest: false,
		};

		console.log('Auth successful - User:', req.user);
		next(); // Proceed to the next middleware
	} catch (err) {
		// Handle specific JWT errors
		if (err.name === "TokenExpiredError") {
			return res.status(403).json({
				message: "Token has expired. Please log in again.",
			});
		} else if (err.name === "JsonWebTokenError") {
			return res.status(403).json({
				message: "Invalid token. Please provide a valid token.",
			});
		} else {
			return res.status(500).json({
				message: "Internal server error while verifying token.",
				error: err.message,
			});
		}
	}
};
