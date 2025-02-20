const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema(
  {
    lecture: { type: String, required: true, trim: true },
    teacher: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
  },
  { _id: false } 
);

const scheduleSchema = new mongoose.Schema(
  {
    lectures: {
      type: [lectureSchema],
      validate: [arrayLimit, "At least one lecture is required."], 
    },
  },
  { timestamps: true }
);

function arrayLimit(val) {
  return val.length > 0;
}

const ScheduleModel = mongoose.model("Schedule", scheduleSchema);

module.exports = ScheduleModel;
