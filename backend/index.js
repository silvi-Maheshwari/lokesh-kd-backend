const express = require("express");
const cors = require("cors");
const getDb = require("./config/server");
const register = require("./routes/Register");
const course = require("./routes/course");
const lectures = require("./routes/Lecture");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Hello K");
});

app.use("/api", register);
app.use("/api", course);
app.use("/api", lectures);

const startServer = async () => {
  try {
    await getDb();
    app.listen(5000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
