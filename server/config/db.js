import mongoose from 'mongoose';

/**
 * Asynchronous function to establish a connection to MongoDB Atlas.
 * Shuts down the application process with failure exit code (1) if connection fails.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Exit process with failure code
    process.exit(1);
  }
};

export default connectDB;
