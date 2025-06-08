import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import { connectDB } from './lib/db.js';
const app = express();
dotenv.config();
app.use(express.json());
app.use("/api/auth",authRoutes)
const PORT = process.env.PORT || 5002 ;
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)
  connectDB();
});