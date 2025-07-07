import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./configs/mongodb.js";
import { clerkWebhooks } from "./controllers/webhooks.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());

// create a simple route
app.get("/", (req, res) => {
  res.send("Backend Server is Running.....");
});
app.post("/clerk", express.json(), clerkWebhooks);

// Start the server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
