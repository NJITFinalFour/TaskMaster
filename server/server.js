// Package depencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
import orgRoutes from "./routes/org";

// Server setup
const PORT = process.env.PORT | 5000;
const app = express();
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("TaskMaster");
});

app.use("/organizations", orgRoutes);

// DB Connect
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// Listening
app.listen(PORT, () => {
  console.log("Server listening at", PORT);
});
