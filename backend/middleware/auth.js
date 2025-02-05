import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";


export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

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
      if (!decoded.userId) {
        return res.status(401).json({
          message: "Invalid token. No user id found.",
        });
      }
        const validUser = await User.findById(decoded.userId);
        if (!validUser) return res.status(401).json({ message: "Invalid user. Please sign up or log in." });
        req.user = validUser; // Attach user data to request object
        console.log("Verified User:", req.user);
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




