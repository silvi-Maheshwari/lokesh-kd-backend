const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      trim: true,
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    description: {
      type: String,
     
      trim: true,
    },
    lectures: {
      type: [String],
     
      // validate: {
      //   validator: (val) =>
      //     val.length > 0 && val.every((lecture) => lecture.trim() !== ""),
      //   message: "Lectures array cannot be empty or contain empty strings",
      // },
    },
    // image: {
    //   type: String,
    //   validate: {
    //     validator: (v) =>
    //       !v || /^https?:\/\/.*\.(jpg|jpeg|png|gif|jfif|svg)$/i.test(v),
    //     message: "Invalid image URL format",
    //   },
    // },
  },
  { timestamps: true }
);

const courseModel = mongoose.model("Course", CourseSchema);
module.exports = courseModel;
