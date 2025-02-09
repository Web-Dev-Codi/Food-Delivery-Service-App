/* /* import User from "../models/userSchema.js"; // Your User model
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken"; // Import jsonwebtoken

dotenv.config();

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate JWT reset token (expires in 1 hour)
    const resetToken = jwt.sign(
      { userId: user._id }, // Payload
      process.env.JWT_SECRET, // Secret key from .env
      { expiresIn: "1h" } // Expiration time (1 hour)
    );

    // Save the token to the user document, or you could store it elsewhere
    user.resetToken = resetToken;
    await user.save();

    // Create reset link
    const resetLink = `${req.protocol}://${req.get(
      "host"
    )}/api/reset-password/${resetToken}`;

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset Request",
      text: `Click the link below to reset your password:\n\n${resetLink}\n\nIf you didn't request this, ignore this email.`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(500).json({ message: "Error sending reset email", error });
  }
};
 */
import User from "../models/userSchema.js";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; // Add bcrypt if not already imported

dotenv.config();

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate JWT reset token (expires in 1 hour)
    const resetToken = jwt.sign(
      { userId: user._id }, // Payload
      process.env.JWT_SECRET, // Secret key from .env
      { expiresIn: "1h" } // Expiration time (1 hour)
    );

    // Save the token to the user document, or you could store it elsewhere
    user.resetToken = resetToken;
    await user.save();

    // Create reset link
    const resetLink = `${req.protocol}://${req.get(
      "host"
    )}/api/auth/reset-password/${resetToken}`;

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset Request",
      text: `Click the link below to reset your password:\n\n${resetLink}\n\nIf you didn't request this, ignore this email.`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Error sending reset email:", error);
    res.status(500).json({ message: "Error sending reset email", error });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  // Check if password is provided
  if (!password) return res.status(400).json({ message: "Password is required" });

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);

    // Find the user by ID from the decoded token
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    // Hash new password
    user.password = await bcrypt.hash(password, 10);
    user.resetToken = undefined; // Clear the reset token after successful password change
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error during token verification:", error);
    res.status(400).json({ message: "Invalid or expired token" });
  }
};
