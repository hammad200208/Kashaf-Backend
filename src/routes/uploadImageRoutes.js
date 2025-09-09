const express = require("express");
const router = express.Router();

//  Cloudinary Multer Middleware (not old local one)
const upload = require("../middlewares/uploadImageMiddleware");

//  Cloudinary Upload Controller
const { uploadImage } = require("../controllers/uploadImageController");

//  Route: Upload single image to Cloudinary
router.post("/upload", upload.single("image"), uploadImage);

module.exports = router;
