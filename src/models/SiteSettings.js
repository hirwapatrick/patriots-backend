const mongoose = require("mongoose");

const siteSettingsSchema = new mongoose.Schema(
  {
    siteName: { type: String, default: "Patriots BBC" },
    tagline: { type: String, default: "Kigali's Basketball Pride" },
    logo: { type: String },
    favicon: { type: String },
    contactEmail: { type: String },
    contactPhone: { type: String },
    address: { type: String },
    locationUrl: { type: String },
    socialLinks: {
      instagram: { type: String },
      facebook: { type: String },
      twitter: { type: String },
      youtube: { type: String },
      tiktok: { type: String },
    },
    metaTitle: { type: String },
    metaDescription: { type: String },
    ogImage: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SiteSettings", siteSettingsSchema);
