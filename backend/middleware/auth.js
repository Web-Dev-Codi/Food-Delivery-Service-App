import jwt from "jsonwebtoken";
// import User from "../models/userSchema.js";


export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // // For cart operations, allow guest access with a temporary user ID
  // if (req.path.startsWith("/api/cart")) {
  //   const guestId = req.headers["x-guest-id"];
  //   if (guestId) {
  //     req.user = {
  //       _id: guestId,
  //       userId: guestId, // Add userId for consistency
  //       isGuest: true,
  //     };
  //     return next();
  //   }
  // }

    if (!authHeader) {
        return res.status(401).json({
            message: "No token provided or token expired or invalid token",
        });

    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({
          message: "Malformed token. Ensure you are using 'Bearer <token>'.",
        });
      }

      try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to the request object
        next(); // Proceed to the next middleware
      }
      catch (err) {
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




