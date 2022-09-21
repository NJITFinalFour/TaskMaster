import express from "express";
import { getTask, createTask, deleteTask, deleteAllTasks, updateTask, getOne } from "../controller/taskController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();
router.use(requireAuth);
router.get("/", getTask);
router.get("/:id", getOne);
router.post("/", createTask);
router.delete("/:id", deleteTask);
router.delete("/", deleteAllTasks);
router.patch("/:id", updateTask);
router.put("/:id", updateTask);

export default router;
