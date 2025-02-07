import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB Database is Connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export { connectDB };
