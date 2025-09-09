// controllers/deleteUploadImageController.js
const cloudinary = require("../config/cloudinary");

const deleteImage = async (req, res) => {
  try {
    const { public_id } = req.body; // ✅ body instead of params

    if (!public_id) {
      return res.status(400).json({ message: "public_id is required" });
    }

    const result = await cloudinary.uploader.destroy(public_id);

    if (result.result !== "ok") {
      return res.status(400).json({ message: "Failed to delete image", result });
    }

    res.status(200).json({
      message: "Image deleted successfully",
      result,
    });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { deleteImage };
