import express from "express";
import connectDB from "./utils/db.js";
import cors from "cors";
import router from "./routes/routes.js";
import dotenv from "dotenv";
dotenv.config();
import restaurantRouter from "./routes/restaurantRoute.js";
import { seedData } from "./controllers/seed.js";
import { handleStripeWebhook } from "./controllers/payment.js";
import paymentRoutes from "./routes/paymentRoute.js";
import menuRouter from "./routes/menuRouter.js";
import userRouter from "./routes/userRouter.js";
import cartRouter from "./routes/cartRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import couponRouter from "./routes/couponRouter.js";
import orderRouter from "./routes/orderRouter.js";

connectDB();

const app = express();
// :white_check_mark: CORS configuration: Allow both frontend and backend communication

const allowedOrigins = [
  "http://localhost:5173", // Development URL for frontend
  process.env.FRONTEND_URL || "https://fourflavoursexpress.onrender.com", // Production URL for frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error("Not allowed by CORS")); // Reject the request
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    allowedHeaders: "Content-Type, Authorization",
  }),
);

// :white_check_mark: Webhook route: Must use `express.raw()` before `express.json()` for Stripe webhook
app.post(
  "/webhook",
  express.raw({ type: "application/json" }), // Handle raw body for Stripe webhook
  handleStripeWebhook,
);
// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use("/api/auth", authRoutes);
app.use("/payment", paymentRoutes); // paymentRouter
app.use("/", router);
app.use("/data", userRouter); // userRouter
app.use("/cart", cartRouter);
app.use("/order", orderRouter);
app.use("/api", restaurantRouter);
app.use("/food", menuRouter);
app.use("/offers", couponRouter);
// :white_check_mark: Seed database route (for debugging or initializing)
app.post("/seed", seedData);
// :white_check_mark: Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
