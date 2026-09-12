const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./src/models/User");

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    const existing = await User.findOne({ email: "admin@patriots.com" });
    if (existing) {
      console.log("Admin user already exists:");
      console.log("  Email: admin@patriots.com");
      console.log("  Password: password123");
      process.exit(0);
    }

    const user = new User({
      name: "Admin",
      email: "admin@patriots.com",
      password: "password123",
      role: "admin",
    });
    await user.save();

    console.log("Admin user created:");
    console.log("  Email: admin@patriots.com");
    console.log("  Password: password123");
    process.exit(0);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
};

seed();
