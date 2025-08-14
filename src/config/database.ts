import mongoose from "mongoose";
import { config } from "./config";

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log(` MongoDB Connected [${config.env}]`);
  } catch (err) {
    console.error(" MongoDB connection failed:", err);
    process.exit(1);
  }
};

export default connectDB;
