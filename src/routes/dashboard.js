const express = require("express");
const Player = require("../models/Player");
const Staff = require("../models/Staff");
const Game = require("../models/Game");
const News = require("../models/News");
const Gallery = require("../models/Gallery");
const Sponsor = require("../models/Sponsor");
const Achievement = require("../models/Achievement");
const Competition = require("../models/Competition");
const Project = require("../models/Project");
const ContactMessage = require("../models/ContactMessage");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const [
      totalPlayers,
      totalStaff,
      upcomingGames,
      totalNews,
      totalGallery,
      totalSponsors,
      totalAchievements,
      totalCompetitions,
      totalProjects,
      unreadMessages,
      recentNews,
      recentGames,
      recentPlayers,
    ] = await Promise.all([
      Player.countDocuments({ status: "active" }),
      Staff.countDocuments({ status: "active" }),
      Game.countDocuments({ status: "upcoming" }),
      News.countDocuments(),
      Gallery.countDocuments(),
      Sponsor.countDocuments(),
      Achievement.countDocuments(),
      Competition.countDocuments(),
      Project.countDocuments(),
      ContactMessage.countDocuments({ read: false }),
      News.find().sort({ createdAt: -1 }).limit(5).select("title category publishedDate status"),
      Game.find().sort({ date: -1 }).limit(5).select("homeTeam awayTeam date status homeScore awayScore"),
      Player.find().sort({ createdAt: -1 }).limit(5).select("firstName lastName jerseyNumber position"),
    ]);

    res.json({
      stats: {
        totalPlayers,
        totalStaff,
        upcomingGames,
        totalNews,
        totalGallery,
        totalSponsors,
        totalAchievements,
        totalCompetitions,
        totalProjects,
        unreadMessages,
      },
      recent: {
        news: recentNews,
        games: recentGames,
        players: recentPlayers,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
