import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_CONN_STRING);
  console.log("Connection Successfull!");
};

export default connectDB;