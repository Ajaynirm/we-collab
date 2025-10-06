import express from "express"
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import healthRouter from "./routes/health.js";
import taskRoute from "./routes/task.route.js"
import { initDB } from "./config/initDB.js";
import { swaggerUi, swaggerSpec } from "./swagger.js";
import { rateLimiter } from "./rateLimitter.js";
import helmet from "helmet";
import passport from "./config/passport.js";
import authRoute from "./routes/auth.route.js";

dotenv.config();

const app=express();


const allowedOriginsForRoute = ['http://localhost:8080'];

initDB()

app.use(helmet());
app.use(rateLimiter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/auth", authRoute);

app.use("/",taskRoute);
app.use("/health", healthRouter);

app.get("/",(req,res)=>{return res.json({"message":"success"})});



// app.listen(PORT,()=>console.log(`server listening on port: ${PORT}`));
export default app;

