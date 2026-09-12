const express = require("express");
const Homepage = require("../models/Homepage");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let homepage = await Homepage.findOne()
      .populate("featuredGame")
      .populate("featuredPlayer")
      .populate("featuredNews");
    if (!homepage) {
      homepage = await Homepage.create({});
    }
    res.json(homepage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/", auth, async (req, res) => {
  try {
    let homepage = await Homepage.findOne();
    if (!homepage) {
      homepage = new Homepage(req.body);
    } else {
      homepage.set(req.body);
    }
    await homepage.save();
    res.json(homepage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
