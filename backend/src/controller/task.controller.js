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
    const db = await openDb();
    const tasks = await db.all('SELECT * FROM tasks ORDER BY created_at DESC');
    return tasks;
  }

export const getTaskById= async(req,res)=>{
    const {id} =req.params

const db = await openDb();
return await db.get(`SELECT * FROM tasks WHERE id = ?`, [id]);
}  

export const updateTask = async(req,res)=>{

}

export const deleteTask = async(req,res)=>{

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