import mongoose from "mongoose";

// Connect to MongoDB

const connectDB = async () => {
  try {
     await mongoose.connect(process.env.DB_URI);
    /* await mongoose.connect("mongodb+srv://fooddeliveryapp2025:testing*****@fooddeliveryapp.2bml8.mongodb.net/?retryWrites=true&w=majority&appName=fooddeliveryapp"), */
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed");
    process.exit(1);  // Exit the process with a failure code
  }
}

export default connectDB;
