import dotenv from "dotenv";
import User from "../models/userSchema.js";
dotenv.config();
import bcrypt from "bcrypt"; // Add bcrypt if not already imported
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const requestPasswordReset = async (req, res) => {
	try {
		const { email } = req.body;
		if (!email)
			return res.status(400).json({ message: "Email is required" });

		console.log("Email received for password reset:", email);

		// Check if user exists
		const user = await User.findOne({ email });

		if (!user) {
			console.log("User not found for email:", email);
			return res.status(404).json({ message: "User not found" });
		}

		// Generate JWT reset token (expires in 1 hour)
		const resetToken = jwt.sign(
			{ userId: user._id }, // Payload
			process.env.JWT_SECRET, // Secret key from .env
			{ expiresIn: "1h" } // Expiration time (1 hour)
		);

		// Save the token to the user document, or you could store it elsewhere
		/* user.resetToken = resetToken;
    await user.save();

    // Create reset link
    const resetLink = `${req.protocol}://${req.get(
      "host"
    )}/api/auth/reset-password/${resetToken}`;
 */
		const resetLink = `${req.protocol}://${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
		console.log("Reset link: ", resetLink); // Debugging log
		// Configure nodemailer
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.GMAIL_USER,
				pass: process.env.GMAIL_PASSWORD,
			},
		});

		// Email content
		const mailOptions = {
			from: process.env.GMAIL_USER,
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
	if (!password)
		return res.status(400).json({ message: "Password is required" });

	try {
		// Verify token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		console.log("Decoded Token:", decoded);

		// Find the user by ID from the decoded token
		const user = await User.findById(decoded.userId);
		if (!user)
			return res
				.status(400)
				.json({ message: "Invalid or expired token" });
		console.log("User found:", user.password);

		// Hash new password
		console.log(password);
		// user.password = await bcrypt.hash(password, 10);
		user.password = password;

		user.resetToken = undefined; // Clear the reset token after successful password change
		await user.save();
		console.log("User found:", user.password);

		res.status(200).json({ message: "Password reset successful" });
	} catch (error) {
		console.error("Error during token verification:", error);
		res.status(400).json({ message: "Invalid or expired token" });
	}
};
