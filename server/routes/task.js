import express from "express";
import { getTask, createTask, deleteTask, /*deleteAllTasks,*/ updateTask, getOne, findTasksByUser, findTasksByOrg } from "../controller/taskController.js";
import requireAuth from "../middleware/requireAuth.js";

import bodyParser from "body-parser";
const jsonParser = bodyParser.json();

const router = express.Router();
// router.use(requireAuth);
router.get("/", getTask);
router.get("/user/:user", jsonParser, findTasksByUser);
router.get("/organization/:organization", jsonParser, findTasksByOrg);
router.get("/:id", getOne);
router.post("/", createTask);
router.delete("/:id", deleteTask);
// router.delete("/", deleteAllTasks);
router.patch("/:id", updateTask);
router.put("/:id", updateTask);

export default router;
