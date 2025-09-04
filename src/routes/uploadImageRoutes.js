const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadImageMiddleware");
const { uploadImage } = require("../controllers/uploadImageController");

// Single file upload with fieldname "image"
router.post("/upload", upload.single("image"), uploadImage);

module.exports = router;