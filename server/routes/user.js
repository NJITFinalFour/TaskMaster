import express from "express";
import { signupUser, loginUser, findUsersByOrg, deleteUserById } from "../controller/userController.js";

const router = express.Router();

//Login Route
router.post("/login", loginUser);
//Sign Up Route
router.post("/signup", signupUser);
// Find by org
router.get("/:organization", findUsersByOrg);
// Delete by id
router.delete("/delete/:id", deleteUserById)

export default router;
