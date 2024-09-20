import express from "express";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 5000;
connectDB();

const app = express();
app.use(
  cors({
    origin: "https://big-money-business.netlify.app", // Allow requests from your Netlify domain
    credentials: true, // If you need to allow credentials like cookies
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("https://bmb-9bgg.onrender.com/api/users", userRoutes);

app.get("/", (req, res) => res.send("server is ready"));
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}`));
