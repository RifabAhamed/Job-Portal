import mongoose from "mongoose";

const dbConfig = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI environment variable not set");
  }

  try {
    await mongoose.connect(mongoUri, {});
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  }

 return mongoose.connection;
};

export default dbConfig;
