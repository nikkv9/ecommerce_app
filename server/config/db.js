import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MDB_URI);
    console.log("db is connected!");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
