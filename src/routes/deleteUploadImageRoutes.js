const express = require("express");
const router = express.Router();
const { deleteImage } = require("../controllers/deleteUploadImageController");

/**
 * @swagger
 * /api/deleteImage:
 *   delete:
 *     summary: Delete an image from Cloudinary
 *     description: Deletes an image using its `public_id` from Cloudinary.
 *     tags: [Images]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               public_id:
 *                 type: string
 *                 example: uploads/abc123
 *     responses:
 *       200:
 *         description: Image deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Image deleted successfully
 *                 result:
 *                   type: object
 *       400:
 *         description: Bad request (missing or invalid public_id)
 *       500:
 *         description: Server error
 */


// DELETE route for removing image from Cloudinary
router.delete("/", deleteImage);

module.exports = router;
