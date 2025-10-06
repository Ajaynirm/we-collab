import { Router } from "express";

import { addTask, getTasks, getTaskById, updateTask, deleteTask,
        filterTask, getPaginatedTask, search, sortByDueDate
 } from "../controller/task.controller.js";

const router=Router()

router.get("/tasks", getTasks);
router.post("/tasks",addTask); 

router.get("/tasks/:id", getTaskById);
router.patch("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

router.get("/tasks/filter/:status/:priority",filterTask);
router.get("/tasks/paginate/:page/:limit",getPaginatedTask);
router.get("/tasks/search/:query",search);
router.get("/tasks/sort/:sort",sortByDueDate);


export default router;



