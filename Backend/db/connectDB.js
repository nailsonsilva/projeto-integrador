import mongoose from "mongoose";

// conecta ao mongodb
const connectDB = (url) => {
  return mongoose.connect(url);
};

export default connectDB;
