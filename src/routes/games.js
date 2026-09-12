const express = require("express");
const Game = require("../models/Game");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { status, season, competition } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (season) filter.season = season;
    if (competition) filter.competition = competition;

    const games = await Game.find(filter)
      .populate("competition", "name slug")
      .sort({ date: -1 });
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/upcoming", async (req, res) => {
  try {
    const games = await Game.find({ status: "upcoming" })
      .populate("competition", "name slug")
      .sort({ date: 1 })
      .limit(5);
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/results", async (req, res) => {
  try {
    const games = await Game.find({ status: "final" })
      .populate("competition", "name slug")
      .sort({ date: -1 })
      .limit(10);
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/featured", async (req, res) => {
  try {
    const game = await Game.findOne({ isFeatured: true, status: "upcoming" })
      .populate("competition", "name slug")
      .sort({ date: 1 });
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/all", auth, async (req, res) => {
  try {
    const games = await Game.find()
      .populate("competition", "name slug")
      .sort({ date: -1 });
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const game = await Game.findById(req.params.id).populate(
      "competition",
      "name slug"
    );
    if (!game) return res.status(404).json({ message: "Game not found" });
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const game = new Game(req.body);
    await game.save();
    res.status(201).json(game);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!game) return res.status(404).json({ message: "Game not found" });
    res.json(game);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);
    if (!game) return res.status(404).json({ message: "Game not found" });
    res.json({ message: "Game deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
