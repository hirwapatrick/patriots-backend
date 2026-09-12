const mongoose = require("mongoose");

const playerStatsSchema = new mongoose.Schema(
  {
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      required: true,
    },
    game: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
    },
    season: { type: String },
    competition: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Competition",
    },
    points: { type: Number, default: 0 },
    rebounds: { type: Number, default: 0 },
    assists: { type: Number, default: 0 },
    steals: { type: Number, default: 0 },
    blocks: { type: Number, default: 0 },
    minutes: { type: Number, default: 0 },
    fieldGoalsMade: { type: Number, default: 0 },
    fieldGoalsAttempted: { type: Number, default: 0 },
    threePointersMade: { type: Number, default: 0 },
    threePointersAttempted: { type: Number, default: 0 },
    freeThrowsMade: { type: Number, default: 0 },
    freeThrowsAttempted: { type: Number, default: 0 },
    turnovers: { type: Number, default: 0 },
    gamesPlayed: { type: Number, default: 0 },
  },
  { timestamps: true }
);

playerStatsSchema.index({ player: 1, season: 1 });

module.exports = mongoose.model("PlayerStats", playerStatsSchema);
