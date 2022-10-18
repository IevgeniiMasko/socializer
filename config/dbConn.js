import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    // user: "admin",
    // pass: "password",
    useUnifiedTopology: true,
    useNewUrlParser: true,
    dbName: "Socializer",
  });

  console.log("Mongodb is connected");
};

export default connectDB;
