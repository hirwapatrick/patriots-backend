const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/projects");
const categoryRoutes = require("./routes/categories");
const uploadRoutes = require("./routes/upload");
const playerRoutes = require("./routes/players");
const staffRoutes = require("./routes/staff");
const gameRoutes = require("./routes/games");
const competitionRoutes = require("./routes/competitions");
const playerStatsRoutes = require("./routes/playerStats");
const teamStatsRoutes = require("./routes/teamStats");
const newsRoutes = require("./routes/news");
const galleryRoutes = require("./routes/gallery");
const sponsorRoutes = require("./routes/sponsors");
const achievementRoutes = require("./routes/achievements");
const homepageRoutes = require("./routes/homepage");
const siteSettingsRoutes = require("./routes/siteSettings");
const contactRoutes = require("./routes/contact");
const dashboardRoutes = require("./routes/dashboard");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/competitions", competitionRoutes);
app.use("/api/player-stats", playerStatsRoutes);
app.use("/api/team-stats", teamStatsRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/sponsors", sponsorRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/homepage", homepageRoutes);
app.use("/api/settings", siteSettingsRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
