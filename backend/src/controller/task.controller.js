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


export const updateTask = async(req,res)=>{

}

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

export const filterTask=async(req,res)=>{
    const {status,priority}=req.params;

}

export const getPaginatedTask = async(req,res)=>{
    const {page,limit}=req.params;


}
export const search= async(req,res)=>{
    const{query}=req.params;

}

export const sortByDueDate=async (req,res)=>{
    const {sort}=req.params;

}