const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const projectRoutes = require("./routes/projectRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/projects", projectRoutes);

app.get("/test", (req, res) => {
  res.send("HELLO MONISHA TEST");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Project Management Backend is running!");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});