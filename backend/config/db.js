const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Conneced: ${conn.connection.host}`.cyan.underline);
  } catch {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
