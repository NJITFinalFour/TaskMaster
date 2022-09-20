// Package depencies
const express = require("express");
require("dotenv").config()

// Server setup
const PORT = process.env.PORT | 5000
const app = express();

// Routes
app.get("/", (req, res) => {
    res.send("TaskMaster")
})

// Listening
app.listen(PORT, () => {
    console.log("Server listening at", PORT)
})