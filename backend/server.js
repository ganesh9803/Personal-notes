import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import notesRoutes from './routes/index.js';

dotenv.config();

const app = express();

// Database connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/notes', notesRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send("API Working");
});

// Export the app for Vercel
export default app;
