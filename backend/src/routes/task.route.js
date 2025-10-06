import { Router } from "express";

import { addTask, getTasks, getTaskById, updateTask, deleteTask,
        filterTask, getPaginatedTask, search, sortByDueDate
 } from "../controller/task.controller.js";

const router=Router()

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 */
router.get("/tasks", getTasks);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Add a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created successfully
 */
router.post("/tasks",addTask); 

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Task details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *       404:
 *         description: Task not found
 */
router.get("/tasks/:id", getTaskById);


/**
 * @swagger
 * /tasks/{id}:
 *   patch:
 *     summary: Update a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated task title"
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 */
router.patch("/tasks/:id", updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
router.delete("/tasks/:id", deleteTask);

/**
 * @swagger
 * /tasks/filter/{status}/{priority}:
 *   get:
 *     summary: Filter tasks by status and priority
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           example: "todo"
 *       - in: path
 *         name: priority
 *         required: true
 *         schema:
 *           type: string
 *           example: "high"
 *     responses:
 *       200:
 *         description: Filtered task list
 */
router.get("/tasks/filter/:status/:priority",filterTask);

/**
 * @swagger
 * /tasks/paginate/{page}/{limit}:
 *   get:
 *     summary: Get paginated tasks
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: path
 *         name: limit
 *         required: true
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Paginated tasks retrieved successfully
 */
router.get("/tasks/paginate/:page/:limit",getPaginatedTask);

/**
 * @swagger
 * /tasks/search/{query}:
 *   get:
 *     summary: Search tasks by keyword
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *           example: "meeting"
 *     responses:
 *       200:
 *         description: Search results
 */
router.get("/tasks/search/:query",search);

/**
 * @swagger
 * /tasks/sort/{sort}:
 *   get:
 *     summary: Sort tasks by due date
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: sort
 *         required: true
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           example: asc
 *     responses:
 *       200:
 *         description: Sorted tasks retrieved successfully
 */
router.get("/tasks/sort/:sort",sortByDueDate);


export default router;





