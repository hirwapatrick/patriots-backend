const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String },
    content: { type: String, required: true },
    coverImage: { type: String },
    category: {
      type: String,
      enum: [
        "Game Report",
        "Team News",
        "Player News",
        "Club News",
        "Announcement",
        "Community",
      ],
      default: "Club News",
    },
    author: { type: String },
    publishedDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    featured: { type: Boolean, default: false },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

newsSchema.index({ status: 1, publishedDate: -1 });
newsSchema.index({ category: 1 });
newsSchema.index({ featured: 1 });

module.exports = mongoose.model("News", newsSchema);
