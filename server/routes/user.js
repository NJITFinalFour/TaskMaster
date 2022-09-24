import express from "express";
import { signupUser, loginUser, findUsersByOrg } from "../controller/userController.js";

const router = express.Router();

//Login Route
router.post("/login", loginUser);
//Sign Up Route
router.post("/signup", signupUser);
// Find by org
router.get("/find", findUsersByOrg);

export default router;
