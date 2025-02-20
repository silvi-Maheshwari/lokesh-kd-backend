const express = require("express");

const course = express.Router();
const courseModel = require("../model/course");

course.post("/course", async (req, res) => {
  try {
    const { courseName, level, description } = req.body;
    let lectures = req.body.lectures;

    if (!Array.isArray(lectures)) {
      lectures = [lectures];
    }

    const newCourse = new courseModel({
      courseName,
      level,
      description,
      lectures,
    });
    console.log(req.body);
    await newCourse.save();
    console.log(req.body);
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

course.get("/course", async (req, res) => {
  try {
    const courses = await courseModel.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = course;
