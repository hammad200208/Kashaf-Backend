// @desc    Upload single image
// @route   POST /api/upload
// @access  Public
const uploadImage = (req, res) => {
  try {
    console.log("Incoming file:", req.file);
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    res.status(200).json({
      message: "File uploaded successfully",
      file: req.file,
      path: `/uploads/${req.file.filename}`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadImage };
