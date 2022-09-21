import express from "express";
import { signupUser, loginUser } from "../controller/userController.js";

const router = express.Router();

//Login Route
router.post("/login", loginUser);
//Sign Up Route
router.post("/signup", signupUser);

export default router;
