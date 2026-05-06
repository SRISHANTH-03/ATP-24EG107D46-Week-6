 import express from "express";
import mongoose from "mongoose";
import { empRoute } from "./APIs/EmpApi.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// CORS middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "https://atp-24-eg-107-d46-week-6-flrm.vercel.app", "https://atp-24-eg-107-d46-week-6-flrm.vercel.app"],
    
  })
);

// body parser middleware
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// emp api middleware
app.use("/emp-api", empRoute);

// invalid path handler
app.use((req, res, next) => {
  return res.status(404).json({
    message: `path ${req.url} is invalid`,
  });
});

// error handler
app.use((err, req, res, next) => {
  console.log(err.name);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation error",
      error: err.message,
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ObjectId",
      error: err.message,
    });
  }

  if (err.name === "MongoServerError" && err.code === 11000) {
    return res.status(409).json({
      message: "No duplicate entries allowed",
      error: err.keyValue,
    });
  }

  res.status(500).json({ message: "Server side error" });
});

// connect to db
const connectDB = async () => {
  try {
    if (!process.env.DB_URL) {
      throw new Error("DB_URL is not defined in .env file");
    }

    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to MongoDB");

    const PORT = process.env.PORT || 6001;
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  } catch (err) {
    // console.error("DB connection failed:", err.message);
    // process.exit(1); // exit process on failure
   
    console.error("FULL ERROR:", err);
    process.exit(1);
  }
};

connectDB();