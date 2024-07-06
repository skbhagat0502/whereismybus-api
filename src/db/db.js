import mongoose from "mongoose";

const connectDB = async (MONGO_URI) => {
  try {
    const data = await mongoose.connect(MONGO_URI);
    console.log("\n====================================================\n");
    console.log(`MongoDB Connected: ${data.connection.host}`);
    console.log("\n====================================================\n");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
