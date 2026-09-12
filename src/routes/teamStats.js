const express = require("express");
const TeamStats = require("../models/TeamStats");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { season, competition } = req.query;
    const filter = {};
    if (season) filter.season = season;
    if (competition) filter.competition = competition;

    const stats = await TeamStats.find(filter)
      .populate("game", "date homeTeam awayTeam")
      .sort({ season: -1 });
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const stats = new TeamStats(req.body);
    await stats.save();
    res.status(201).json(stats);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const stats = await TeamStats.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!stats) return res.status(404).json({ message: "Stats not found" });
    res.json(stats);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const stats = await TeamStats.findByIdAndDelete(req.params.id);
    if (!stats) return res.status(404).json({ message: "Stats not found" });
    res.json({ message: "Stats deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
