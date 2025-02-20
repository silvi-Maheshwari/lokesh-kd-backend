const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const RegisterModel = require("../model/Registe");

const register = express.Router();

register.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;
console.log(req.body)
    const existingUser = await RegisterModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new RegisterModel({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

register.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await RegisterModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, "lokesh", {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

register.get("/users", async (req, res) => {
  try {
    const users = await RegisterModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

register.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, password, role } = req.body;

    const user = await RegisterModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.body.email && req.body.email !== user.email) {
      return res.status(400).json({ message: "Email cannot be changed" });
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (role) user.role = role;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = register;
