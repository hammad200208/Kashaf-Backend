const express = require("express");
const router = express.Router();

// Cloudinary Multer Middleware (not old local one)
const upload = require("../middlewares/uploadImageMiddleware");

// Cloudinary Upload Controller
const { uploadImage } = require("../controllers/uploadImageController");

/**
 * @swagger
 * /api/uploadImage/upload:
 *   post:
 *     summary: Upload an image to Cloudinary
 *     description: Uploads a single image file to Cloudinary and returns its URL + public_id.
 *     tags:
 *       - Images
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Successfully uploaded to Cloudinary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully uploaded to Cloudinary
 *                 url:
 *                   type: string
 *                   example: https://res.cloudinary.com/demo/image/upload/sample.jpg
 *                 public_id:
 *                   type: string
 *                   example: uploads/sample123
 *       400:
 *         description: No file uploaded
 *       500:
 *         description: Server error
 */

// Route: Upload single image to Cloudinary
router.post("/upload", upload.single("image"), uploadImage);

module.exports = router;
