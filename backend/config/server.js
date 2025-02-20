const mongoose = require("mongoose");
require("dotenv").config();
const getDb = () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = getDb;
