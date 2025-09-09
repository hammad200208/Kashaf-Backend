const express = require("express");
const router = express.Router();
const { deleteImage } = require("../controllers/deleteUploadImageController");

// DELETE route for removing image from Cloudinary
router.delete("/", deleteImage);

module.exports = router;
