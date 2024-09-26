import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import dotenv from "dotenv";

// Place this right after `app` is initialized
app.use(
  cors({
    origin: "*", // Temporarily allow all origins
    credentials: true,
  })
);

dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

// Allow multiple origins for Vercel URLs

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("Server is ready"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
