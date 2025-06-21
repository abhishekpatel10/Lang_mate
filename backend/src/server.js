import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import chatRoutes from './routes/chat.route.js';
import cors from 'cors';
import path from 'path'


const app = express();
const __dirname = path.resolve();
dotenv.config();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/chat",chatRoutes)

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))
  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
  })
}
const PORT = process.env.PORT || 5002 ;
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)
  connectDB();
});