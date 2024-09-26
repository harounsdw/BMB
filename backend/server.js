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

// CORS configuration to allow all origins temporarily
app.use(
  cors({
    origin: "https://bmb-kappa.vercel.app/", // Only allow this specific domain
    credentials: true, // Allow cookies and credentials
    methods: "GET,POST,PUT,DELETE,OPTIONS", // Allow specific methods
    allowedHeaders: "Content-Type,Authorization", // Allow specific headers
  })
);
app.options("*", cors()); // Handle preflight requests for all routes

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("Server is ready"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
