import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import chatRoutes from './routes/chat.route.js';
import cors from 'cors';
const app = express();
dotenv.config();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("api/chat",chatRoutes)
const PORT = process.env.PORT || 5002 ;
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)
  connectDB();
});