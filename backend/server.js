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

// import { seedData } from "./controllers/Menu.js";
import userRouter from "./routes/userRouter.js";
import cartRouter from "./routes/cartRoutes.js";
import authRoutes from "./routes/authRoutes.js";

connectDB();

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
app.use("/data", userRouter);  //userRouter
app.use("/api/cart", cartRouter);
app.use("/api/auth", authRoutes);

app.use("/api", restaurantRouter);
app.use("/food", menuRouter);

// ✅ Seed database
app.post("/seed", seedData);


// ✅ Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
