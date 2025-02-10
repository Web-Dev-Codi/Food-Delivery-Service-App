import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import router from "./routes/userRouter.js";
import restaurantRouter from "./routes/restaurantRoute.js";
import menuRouter from "./routes/menuRouter.js";
import { seedData } from "./controllers/seed.js";
import { handleStripeWebhook } from "./controllers/payment.js";
import paymentRoutes from "./routes/paymentRoute.js";

dotenv.config();

const app = express();

// ✅ Enable CORS for frontend requests
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your front-end URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// ✅ Webhook route - MUST use `express.raw()` BEFORE `express.json()`
app.post('/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/payment', paymentRoutes);  //paymentRouter


app.use("/", router); //userRouter
app.use("/data", router);  //userRouter
app.use("/api", restaurantRouter);
app.use("/food", menuRouter);

// ✅ Seed database
app.post("/seed", seedData);

// ✅ Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed", error);
    process.exit(1);
  }
};
connectDB();

// ✅ Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
