const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String },
    imageUrl: { type: String, required: true },
    caption: { type: String },
    category: {
      type: String,
      enum: ["Games", "Training", "Team", "Events", "Fans"],
      default: "Team",
    },
    game: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
    },
    date: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

gallerySchema.index({ category: 1 });
gallerySchema.index({ status: 1 });

module.exports = mongoose.model("Gallery", gallerySchema);
