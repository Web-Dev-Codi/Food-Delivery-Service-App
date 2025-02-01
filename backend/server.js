import express from "express";
import mongoose from "mongoose";
import router from "./routes/userRouter.js";
import dotenv from "dotenv";
import restaurantRouter from "./routes/restaurantRoute.js";
import cors from "cors";

dotenv.config();




const app = express();

app.use(cors({
  origin: ' http://localhost:5173', // Replace with your front-end URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
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



app.use("/data", router);
app.use("/api", restaurantRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
