import express from "express";

import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouters from "./routes/userRoute.js";

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
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});

app.use("/api/user", userRouters);
