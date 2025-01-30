import express from "express";
import mongoose from "mongoose";
import router from "./routes/userRouter.js";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/routes.js";
dotenv.config();
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notFound.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed");
    process.exit(1);  // Exit the process with a failure code
  }
}

connectDB();

app.use("/", router);

// 404 handler
app.use(notFound);

// Error handler - must be last
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
