import express from "express";

import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouters from "./routes/userRoute.js";
import authRouters from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});

app.use(express.json());

app.use(cookieParser());

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});

app.use("/api/user", userRouters);
app.use("/api/auth", authRouters);

//middleware for error handling

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
