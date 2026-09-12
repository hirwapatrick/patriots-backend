const express = require("express");
const Competition = require("../models/Competition");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const competitions = await Competition.find({ status: "active" }).sort({
      name: 1,
    });
    res.json(competitions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/all", auth, async (req, res) => {
  try {
    const competitions = await Competition.find().sort({ name: 1 });
    res.json(competitions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const competition = await Competition.findById(req.params.id);
    if (!competition)
      return res.status(404).json({ message: "Competition not found" });
    res.json(competition);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const competition = new Competition(req.body);
    await competition.save();
    res.status(201).json(competition);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const competition = await Competition.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!competition)
      return res.status(404).json({ message: "Competition not found" });
    res.json(competition);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const competition = await Competition.findByIdAndDelete(req.params.id);
    if (!competition)
      return res.status(404).json({ message: "Competition not found" });
    res.json({ message: "Competition deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
