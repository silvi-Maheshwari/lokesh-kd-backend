const express = require("express");
const ScheduleModel = require("../model/Lecture");


const lectures = express.Router();
lectures.post("/schedule", async (req, res) => {
  try {
    const { lectures } = req.body;
    const newSchedule = new ScheduleModel({ lectures });
    await newSchedule.save();
    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

lectures.get("/schedule", async (req, res) => {
  try {
    const schedules = await ScheduleModel.find();
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = lectures;
