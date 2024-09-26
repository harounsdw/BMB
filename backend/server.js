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
// Place this right after `app` is initialized
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests from vercel.app and your local dev environment if needed
      if (/vercel\.app$/.test(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.options("*", cors()); // Handle preflight requests for all routes
app.use((req, res, next) => {
  console.log("Request origin:", req.headers.origin);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("Server is ready"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
