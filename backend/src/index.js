import path from "path";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./Database/db.js";
import productRoutes from "./routes/product.routes.js";

// Load environment variables first
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up CORS before routes
app.use(
  cors({
    origin: ["http://localhost:5173", "https://fleximart.onrender.com"],
    credentials: true,
  })
);

// Cookie Parser middleware
app.use(cookieParser());

// Define routes
app.use("/api/product", productRoutes);

// Serve static frontend files
const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, "frontend/dist")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

// Connect to database and start the server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
