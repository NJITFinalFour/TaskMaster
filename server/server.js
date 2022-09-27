// Package depencies
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import orgRoutes from "./routes/org.js";
import taskRoutes from "./routes/task.js";
import userRoutes from "./routes/user.js";
import bodyParser from "body-parser";

dotenv.config();

// Server setup
const PORT = process.env.PORT | 5000;
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));


// Routes
app.get("/", (req, res) => {
  res.send("TaskMaster");
});

app.use("/user", userRoutes);
app.use("/tasks", taskRoutes);
app.use("/organizations", orgRoutes);

// DB Connect
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// Listening
app.listen(process.env.PORT || 5000, () => {
  console.log("Server listening at", PORT);
});
