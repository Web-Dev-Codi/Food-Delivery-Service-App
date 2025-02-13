import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create a Nodemailer transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail", // Gmail SMTP service
  auth: {
    user: process.env.EMAIL_USER,  // Your Gmail address
    pass: process.env.EMAIL_PASS,  // Your Gmail password or app password
  },
});

export default transporter;
