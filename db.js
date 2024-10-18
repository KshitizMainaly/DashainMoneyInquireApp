import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const URL = process.env.AtlasDb;

async function connectDB() {
  try {
    await mongoose.connect(URL, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    });

    console.log("Database connected successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

const DB = mongoose.connection;

DB.on('connected', () => {
  console.log("Database is connected");
});

DB.on('disconnected', () => {
  console.log("Database is disconnected");
});

DB.on('error', (error) => {
  console.error("Error in connecting to MongoDB:", error);
});

await connectDB(); // Ensures mongoose.connect() is awaited in the correct context

export default DB;
