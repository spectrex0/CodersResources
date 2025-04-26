const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const DATA_FILE = path.join(__dirname, "../db.json");
router.get("/", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    res.status(200).json(data.feedbacks);
  } catch (error) {
    console.error("Error reading feedbacks:", error);
    res.status(500).json({ error: "Failed to read feedbacks" });
  }
});

router.post("/", (req, res) => {
  const { userName, comment } = req.body;

  if (!userName || !comment) {
    return res.status(400).json({ error: "comment are required." });
  }

  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    data.feedbacks.push({ userName, comment });
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.status(200).json({ message: "Comment saved successfully!" });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ error: "Failed to save feedback" });
  }
});

module.exports = router;