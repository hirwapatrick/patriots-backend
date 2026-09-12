const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: {
      type: String,
      enum: ["Head Coach", "Assistant Coach", "Team Manager", "Technical Staff", "Medical Staff"],
      required: true,
    },
    photo: { type: String },
    biography: { type: String },
    nationality: { type: String },
    socialLinks: {
      instagram: { type: String },
      twitter: { type: String },
      facebook: { type: String },
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

staffSchema.index({ role: 1 });
staffSchema.index({ status: 1 });

module.exports = mongoose.model("Staff", staffSchema);
