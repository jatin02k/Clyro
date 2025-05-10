import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import taskRoutes from '../src/routes/taskRoutes.js'

// to get .env file
dotenv.config();

const app = express()

app.use(cors());
app.use(express.json());

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI);
  

// create routes
app.get("/",(req,res)=>{
    res.send("Task manager api is running")
});

// connect routes to server
app.use('/api/task',taskRoutes);
app.use('/api/auth',authRoutes);

// live the server 
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server is running on Port: ${PORT}`)
})