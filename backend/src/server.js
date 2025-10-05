import express from "express"
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import healthRouter from "./routes/health.js";

dotenv.config();
const app=express();
const PORT = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Routes
app.use("/health", healthRouter);

app.get("/test-curl",(req,res)=>{return res.json({"message ": "Your server listening properly "})});
app.post("/test/post-curl", (req,res)=>{return res.json(req)})
app.listen(PORT,()=>console.log(`server listening on port: ${PORT}`));

