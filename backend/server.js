import express from "express";
import connectDB from "./utils/db.js";
import router from "./routes/routes.js";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
dotenv.config();
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notFound.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/data", userRouter);
app.use("/", router);

// 404 handler
app.use(notFound);

// Error handler - must be last
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
