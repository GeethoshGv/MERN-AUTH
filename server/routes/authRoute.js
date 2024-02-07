import express from "express";
import { SignUp, Signin } from "../controller/authControllers.js";

const router = express.Router();

router.post("/signup", SignUp);
router.post("/signin", Signin);

export default router;
