import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import taskRoutes from './routes/taskRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['SECRET_KEY', 'PORT'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
    console.error('Missing required environment variables:', missingEnvVars.join(', '));
    process.exit(1);
}

const app = express();

// Middleware
const allowedOrigins = [
    process.env.CLIENT_URL,
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002"
  ];
  app.use(cors({
    origin: allowedOrigins,
    credentials: true
  }));
app.use(express.json());
app.use(cookieParser());

// MongoDB Connection with fallback
const connectToMongoDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.log('⚠️  MONGO_URI not found in .env file');
            console.log('🔧 Please add your MongoDB connection string to .env file');
            console.log('💡 For development, you can use MongoDB Atlas (free): https://www.mongodb.com/atlas');
            console.log('📝 Example: MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/task-manager');
            process.exit(1);
        }
        
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB successfully');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        console.log('\n🔧 To fix this issue:');
        console.log('1. Install MongoDB locally: sudo dnf install mongodb-org');
        console.log('2. Or use MongoDB Atlas (cloud): https://www.mongodb.com/atlas');
        console.log('3. Update your .env file with the correct MONGO_URI');
        console.log('\n💡 For development, you can also use a mock database temporarily');
        process.exit(1);
    }
};

// Connect to MongoDB
connectToMongoDB();

// Health check route
app.get("/", (req, res) => {
    res.json({ status: "Task manager API is running" });
});

// API Routes
app.use('/api/task', taskRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on Port: ${PORT}`);
    console.log(`📱 API available at: http://localhost:${PORT}`);
});

