import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Testing the server endpoint
app.get("/", (req, res) => {
  res.send("API is running...");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
