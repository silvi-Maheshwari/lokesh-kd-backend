const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["instructor", "admin"],
      default: "instructor",
    },
  },
  { timestamps: true }
);

const RegisterModel = mongoose.model("Register", registerSchema);
module.exports = RegisterModel;
