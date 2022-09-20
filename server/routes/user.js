import express from "express";
const router = express.Router();
//controllers
import { signupUser, loginUser } from "../controllers/userController.js";

//Login Route
router.post("/login", loginUser);
//Sign Up Route
router.post("/signup", signupUser);

export default router;
