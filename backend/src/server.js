import express from "express"
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import healthRouter from "./routes/health.js";
import taskRoute from "./routes/task.route.js"
import { initDB } from "./config/initDB.js";

dotenv.config();

const app=express();
const PORT = process.env.PORT || 5000;

const allowedOriginsForRoute = ['http://localhost:8080'];

initDB()

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api",taskRoute);
app.use("/health", healthRouter);

app.get("/",(req,res)=>{return res.json({"message":"success"})});



// app.listen(PORT,()=>console.log(`server listening on port: ${PORT}`));
export default app;

