import express from "express";
import { one, updateUser, deleteUser } from "../controller/userController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", one);

router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

export default router;
