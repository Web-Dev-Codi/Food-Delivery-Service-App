import mongoose from "mongoose";

// Connect to MongoDB

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed");
    process.exit(1);  // Exit the process with a failure code
  }
}

export default connectDB;
