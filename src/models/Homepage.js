const mongoose = require("mongoose");

const homepageSchema = new mongoose.Schema(
  {
    hero: {
      backgroundImage: { type: String },
      title: { type: String, default: "PATRIOTS BBC" },
      subtitle: { type: String, default: "BUILT TO COMPETE. BORN TO WIN." },
      description: { type: String, default: "Kigali's basketball pride." },
      primaryButtonText: { type: String, default: "MEET THE TEAM" },
      primaryButtonUrl: { type: String, default: "/team" },
      secondaryButtonText: { type: String, default: "UPCOMING GAME" },
      secondaryButtonUrl: { type: String, default: "/games" },
      active: { type: Boolean, default: true },
    },
    statistics: [
      {
        value: { type: String },
        label: { type: String },
        order: { type: Number, default: 0 },
        active: { type: Boolean, default: true },
      },
    ],
    featuredGame: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
    },
    featuredPlayer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
    featuredNews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "News",
      },
    ],
    socialLinks: {
      instagram: { type: String },
      facebook: { type: String },
      twitter: { type: String },
      youtube: { type: String },
      tiktok: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Homepage", homepageSchema);
