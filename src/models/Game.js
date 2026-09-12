const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    homeTeam: { type: String, required: true },
    awayTeam: { type: String, required: true },
    homeScore: { type: Number },
    awayScore: { type: Number },
    date: { type: Date, required: true },
    time: { type: String },
    venue: { type: String },
    competition: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Competition",
    },
    season: { type: String },
    homeLogo: { type: String },
    awayLogo: { type: String },
    ticketInfo: { type: String },
    status: {
      type: String,
      enum: ["upcoming", "live", "final", "postponed", "cancelled"],
      default: "upcoming",
    },
    matchReport: { type: String },
    highlights: { type: String },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

gameSchema.index({ date: -1 });
gameSchema.index({ status: 1 });
gameSchema.index({ isFeatured: 1 });

module.exports = mongoose.model("Game", gameSchema);
