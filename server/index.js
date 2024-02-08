import express from "express";

import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouters from "./routes/userRoute.js";
import authRouters from "./routes/authRoute.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());
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
