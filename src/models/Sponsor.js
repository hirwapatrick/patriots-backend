const mongoose = require("mongoose");

const sponsorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    logo: { type: String },
    website: { type: String },
    description: { type: String },
    level: {
      type: String,
      enum: [
        "Title Partner",
        "Main Partner",
        "Official Partner",
        "Media Partner",
        "Community Partner",
      ],
      default: "Official Partner",
    },
    order: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

sponsorSchema.index({ level: 1 });
sponsorSchema.index({ status: 1 });

module.exports = mongoose.model("Sponsor", sponsorSchema);
