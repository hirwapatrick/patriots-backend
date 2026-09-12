const express = require("express");
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.json({
    url: req.file.path,
    secure_url: req.file.secure_url,
    filename: req.file.filename,
    public_id: req.file.public_id,
    format: req.file.format,
    width: req.file.width,
    height: req.file.height,
  });
});

router.post("/multiple", auth, upload.array("files", 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }
  const files = req.files.map((f) => ({
    url: f.path,
    secure_url: f.secure_url,
    filename: f.filename,
    public_id: f.public_id,
    format: f.format,
    width: f.width,
    height: f.height,
  }));
  res.json(files);
});

module.exports = router;
