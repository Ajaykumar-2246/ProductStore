import dotenv from "dotenv";
import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./Database/db.js";

const app = express();

dotenv.config({
  path: ".env",
});

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    origin: ["http://localhost:5173", "https://fleximart.onrender.com"],
    credentials: true,
  })
);
const __dirname = path.resolve();

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});

import productRoutes from "./routes/product.routes.js";

app.use("/api/product", productRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
