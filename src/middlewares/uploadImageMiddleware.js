// const multer = require("multer");
// const path = require("path");

// // اسٹوریج کنفیگریشن (فائل کہاں اور کس نام سے محفوظ ہوگی)
// const storage = multer.diskStorage({
//   // فائل اپ لوڈ ہونے کی جگہ (uploads فولڈر کے اندر محفوظ ہوگی)
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // اپ لوڈ ہونے والی فائل کا فولڈر
//   },
//   // فائل کا نام کس طرح رکھا جائے
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     // فائل کا نام = fieldname + uniqueSuffix + اصل ایکسٹینشن
//     cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
//   },
// });

// // فائل فلٹر (صرف تصاویر کی اجازت ہے)
// const fileFilter = (req, file, cb) => {
//   // صرف jpg, jpeg, png کی اجازت
//   const allowedTypes = /jpeg|jpg|png/;
//   const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase()); // ایکسٹینشن چیک
//   const mimetype = allowedTypes.test(file.mimetype); // مائم ٹائپ چیک

//   if (extname && mimetype) {
//     cb(null, true); // اگر سب ٹھیک ہے تو اپ لوڈ کر دو
//   } else {
//     cb(new Error("صرف .jpg, .jpeg, .png فائلز کی اجازت ہے!")); // ورنہ ایرر
//   }
// };

// // ملٹر اپ لوڈ کنفیگریشن
// const upload = multer({
//   storage: storage,               // اوپر والی اسٹوریج کنفیگریشن
//   limits: { fileSize: 1024 * 1024 * 5 }, // زیادہ سے زیادہ فائل سائز 5MB
//   fileFilter: fileFilter,         // اوپر والا فلٹر
// });

// // اس ماڈیول کو ایکسپورٹ کر رہے ہیں تاکہ دوسرے فائلز میں استعمال ہو سکے
// module.exports = upload;


const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",                  // Folder name in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"], // Only allow these file types
  },
});

// Multer configuration with Cloudinary storage
const upload = multer({ storage });

module.exports = upload;
