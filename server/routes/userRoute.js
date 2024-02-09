import express from "express";
import { one, updateUser } from "../controller/userController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", one);
router.post("/update/:id", verifyToken, updateUser);

export default router;
