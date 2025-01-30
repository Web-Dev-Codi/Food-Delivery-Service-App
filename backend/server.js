import express from "express";
import mongoose from "mongoose";
import router from "./routes/userRouter.js";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";

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



app.use("/data", router);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
