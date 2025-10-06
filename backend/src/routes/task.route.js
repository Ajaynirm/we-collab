import { Router } from "express";

import { addTask, getTasks, getTaskById, updateTask, deleteTask } from "../controller/task.controller.js";

const router=Router()

router.get("/tasks", getTasks);
router.post("/tasks",addTask); 

router.get("/tasks/:id", getTaskById);
router.patch("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);


export default router;