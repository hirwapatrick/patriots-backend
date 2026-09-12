const mongoose = require("mongoose");

const teamStatsSchema = new mongoose.Schema(
  {
    game: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
    },
    season: { type: String },
    competition: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Competition",
    },
    totalPoints: { type: Number, default: 0 },
    totalRebounds: { type: Number, default: 0 },
    totalAssists: { type: Number, default: 0 },
    totalSteals: { type: Number, default: 0 },
    totalBlocks: { type: Number, default: 0 },
    totalTurnovers: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
  },
  { timestamps: true }
);

teamStatsSchema.index({ season: 1 });

module.exports = mongoose.model("TeamStats", teamStatsSchema);
