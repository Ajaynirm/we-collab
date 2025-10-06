import { openDb } from '../config/db.js';

export async function addTask(req, res) {
    const { title, description } = req.body;
    try {
      const db = await openDb();
      const result = await db.run(
        'INSERT INTO tasks (title, description) VALUES (?, ?)',
        [title, description]
      );
  
      // ✅ Explicitly respond with the new ID and inserted data
      return res.status(201).json({
        id: result.lastID,
        title,
        description
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  

export async function getTasks(req,res) {
  try{
    const db = await openDb();
    const tasks = await db.all('SELECT * FROM tasks ORDER BY created_at DESC');
    return res.status(200).json(tasks);
  }catch(error){
    return res.status(404).json({"message":"Failed to get all tasks"})
  }
  }

export const getTaskById= async(req,res)=>{
    const {id} =req.params
    try{
      const db = await openDb();
      const task = await db.get(`SELECT * FROM tasks WHERE id = ?`, [id]);
      return res.status(200).json(task);
    }catch(error){
      return res.status(500);
    }
}  


export const updateTask = async (req, res) => {
  try {

    const { id } = req.params;             // task ID from URL
    const { title, description, status, priority, due_date } = req.body; // fields to update
    const db = await openDb();

    // Validate: must have at least one field
    if (!title && !description && !status && !priority && !due_date) {
      return res.status(400).json({ message: "No fields provided to update" });
    }

    // Build dynamic update query
    const fields = [];
    const values = [];

    if (title) {
      fields.push("title = ?");
      values.push(title);
    }
    if (description) {
      fields.push("description = ?");
      values.push(description);
    }
    if (status) {
      fields.push("status = ?");
      values.push(status);
    }
    if (priority) {
      fields.push("priority = ?");
      values.push(priority);
    }
    if (due_date) {
      fields.push("due_date = ?");
      values.push(due_date);
    }

    // Add the task ID at the end for WHERE clause
    values.push(id);

    const query = `UPDATE tasks SET ${fields.join(", ")} WHERE id = ?`;
    const result = await db.run(query, values);

    if (result.changes === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updated = await db.get("SELECT * FROM tasks WHERE id = ?", [id]);
    res.json({ message: "Task updated successfully", data: updated });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating task", error: error.message });
  }
};


export const deleteTask = async(req,res)=>{
  const {id} =req.params
  try{
    const db = await openDb();
    const task = await db.get(`DELETE FROM tasks WHERE id = ?`, [id]);
    
    return res.status(200).json({ message: "Task deleted successfully", id });
  
  }catch(error){
    console.error("❌ DELETE /api/tasks error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export const filterTask = async (req, res) => {
  try {
    console.log("Hi")
    const db = await openDb();
    const { status, priority } = req.query;

    let query = "SELECT * FROM tasks WHERE 1=1";
    const params = [];

    if (status) {
      query += " AND status = ?";
      params.push(status);
    }
    if (priority) {
      query += " AND priority = ?";
      params.push(priority);
    }

    const rows = await db.all(query, params);
    console.log(rows,1)
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getPaginatedTask = async (req, res) => {
  try {
    const db = await openDb();

    const page = parseInt(req.params.page) || 1;
    const limit = parseInt(req.params.limit) || 10;
    const offset = (page - 1) * limit;

    const tasks = await db.all("SELECT * FROM tasks LIMIT ? OFFSET ?", [limit, offset]);
    const count = await db.get("SELECT COUNT(*) as total FROM tasks");

    res.json({
      total: count.total,
      page,
      limit,
      totalPages: Math.ceil(count.total / limit),
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const search = async (req, res) => {
  try {
    const db = await openDb();

    const { query } = req.params;

    const tasks = await db.all(
      "SELECT * FROM tasks WHERE title LIKE ? OR description LIKE ?",
      [`%${query}%`, `%${query}%`]
    );

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const sortByDueDate = async (req, res) => {
  try {
    const db = await openDb();
    const { sort } = req.params; // 'asc' or 'desc'
    const order = sort?.toUpperCase() === "DESC" ? "DESC" : "ASC";

    const tasks = await db.all(`SELECT * FROM tasks ORDER BY due_date ${order}`);

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
