const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const router = express.Router();

/* ============================
   Cloudinary config
============================ */
cloudinary.config({
  cloud_name: "djikwo1nv",
  api_key: "421379823212898",
  api_secret: "za_fkR_wPlp2HvzTfBaeFykiQcQ",
});

/* ============================
   Multer (MEMORY storage)
============================ */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    const ext = allowed.test(file.originalname.toLowerCase());
    const mime = allowed.test(file.mimetype);

    if (ext && mime) cb(null, true);
    else cb(new Error("Only image files are allowed"));
  },
});

/* ============================
   Upload API
============================ */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const base64Image = `data:${
      req.file.mimetype
    };base64,${req.file.buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(base64Image, {
      folder: "uploads",
    });

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      filePath: result.secure_url,
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Upload failed",
    });
  }
});

module.exports = router;
