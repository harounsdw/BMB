import express from "express";
import cors from "cors"; // Import CORS
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

// CORS configuration
const allowedOrigins = ["https://big-money-business.netlify.app"]; // Replace with your Netlify domain

app.use(
  cors({
    origin: allowedOrigins, // Only allow requests from this origin
    credentials: true, // Allow sending cookies and credentials
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("Server is ready"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
