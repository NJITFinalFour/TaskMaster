import express from "express";
import { getTask } from "../controller/taskController";
import { createTask } from "../controller/taskController";
import { deleteTask } from "../controller/taskController";
import { deleteAllTasks } from "../controller/taskController";
import { updateTask } from "../controller/taskController";
import { getOne } from "../controller/taskController";
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
