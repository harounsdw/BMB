import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

// Allow multiple origins for Vercel URLs
const allowedOrigins = [
  "https://bmb-kappa.vercel.app/", // Production Vercel URL
  "https://bmb-git-main-harouns-projects-00689d4a.vercel.app/", // Another Vercel URL
  "https://bmb-mermen9xh-harouns-projects-00689d4a.vercel.app/", // Replace this with your actual production URL
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow any subdomain of Vercel
      if (/vercel\.app$/.test(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
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
