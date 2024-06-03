import mongoose from 'mongoose'
import { MONGO_URI } from '../utils/constant.js';

export const connectDb = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            dbName: 'quizzie'
        });
        console.log('Database connection successful');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Terminate the application with an error code (1)
    }
};