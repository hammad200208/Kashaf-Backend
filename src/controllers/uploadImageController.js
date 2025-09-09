// // @desc    ایک تصویر اپ لوڈ کرنے کا فنکشن
// // @route   POST /api/upload
// // @access  Public
// const uploadImage = (req, res) => {
//   try {
//     // لاگ کریں تاکہ کنسول میں آنے والی فائل کی تفصیل دیکھ سکیں
//     console.log("Incoming file:", req.file);

//     // اگر کوئی فائل اپ لوڈ نہیں ہوئی تو ایرر واپس کریں
//     if (!req.file) {
//       return res.status(400).json({ message: "کوئی فائل اپ لوڈ نہیں ہوئی" });
//     }

//     // اگر فائل موجود ہے تو کامیابی کا پیغام واپس کریں
//     res.status(200).json({
//       message: "فائل کامیابی کے ساتھ اپ لوڈ ہوگئی", // کامیابی کا پیغام
//       file: req.file,                              // ملٹر سے آنے والی فائل کی مکمل تفصیل
//       path: `/uploads/${req.file.filename}`,       // اپ لوڈ ہونے والی فائل کا راستہ
//     });
//   } catch (error) {
//     // اگر کوئی سرور کی خرابی ہو تو 500 کا ایرر واپس کریں
//     res.status(500).json({ message: error.message });
//   }
// };

// // فنکشن کو ایکسپورٹ کریں تاکہ اسے روٹس میں استعمال کیا جا سکے
// module.exports = { uploadImage };


// @desc    ایک تصویر کلاؤڈینری پر اپ لوڈ کرنے کا فنکشن
// @route   POST /api/upload
// @access  Public
// controllers/uploadImageController.js
const uploadImage = (req, res) => {
  try {
    console.log("Cloudinary file response:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "کوئی فائل اپ لوڈ نہیں ہوئی" });
    }

    res.status(200).json({
      message: "Successfully uploaded to Cloudinary",
      url: req.file.path,       // Cloudinary secure URL
      public_id: req.file.filename, // Cloudinary public ID
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "سرور میں خرابی آگئی", error: error.message });
  }
};

module.exports = { uploadImage };

