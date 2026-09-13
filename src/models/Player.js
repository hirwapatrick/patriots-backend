const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    jerseyNumber: { type: Number, required: true },
    position: {
      type: String,
      enum: ["Guard", "Forward", "Center"],
      required: true,
    },
    height: { type: String },
    weight: { type: String },
    nationality: { type: String },
    dateOfBirth: { type: Date },
    photo: { type: String },
    biography: { type: String },
    previousTeam: { type: String },
    status: {
      type: String,
      enum: ["active", "inactive", "injured", "retired"],
      default: "active",
    },
    socialLinks: {
      instagram: { type: String },
      twitter: { type: String },
      facebook: { type: String },
    },
    order: { type: Number, default: 0 },
    isMvp: { type: Boolean, default: false },
  },
  { timestamps: true }
);

playerSchema.index({ jerseyNumber: 1 });
playerSchema.index({ position: 1 });
playerSchema.index({ status: 1 });

module.exports = mongoose.model("Player", playerSchema);
