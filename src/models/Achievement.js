const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema(
  {
    year: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    category: { type: String },
    displayOrder: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["published", "draft"],
      default: "published",
    },
  },
  { timestamps: true }
);

achievementSchema.index({ year: 1 });
achievementSchema.index({ status: 1 });

module.exports = mongoose.model("Achievement", achievementSchema);
