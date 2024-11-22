import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import notesRoutes from './routes/index.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000 

// Database connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/notes', notesRoutes);

// Start server
app.get('/',(req,res)=> {
  res.send("API Working")
})

app.listen(port, ()=>console.log('Sever started on PORT : ' + port))
