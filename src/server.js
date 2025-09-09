// // ایکسپریس فریم ورک امپورٹ کریں
// const express = require("express");

// // MongoDB سے کنکشن کرنے والا فنکشن امپورٹ کریں
// const connectDB = require("./db/db"); 

// // پاتھ ماڈیول (فائل پاتھ بنانے کے لیے)
// const path = require("path");

// // یوزر روٹس (CRUD APIs کے لیے)
// const userRoutes = require("./routes/userRoutes"); 

// // .env فائل سے ماحول کی ویری ایبلز لوڈ کریں
// require("dotenv").config({ quiet: true });

// // اپ لوڈ روٹس (امیج اپ لوڈ کے لیے)
// const uploadRoutes = require("./routes/uploadImageRoutes");

// // ایکسپریس ایپ بنائیں
// const app = express();


// // ==================== MIDDLEWARE ====================
// // JSON ڈیٹا کو پڑھنے کے لیے مڈل ویئر (req.body استعمال کرنے کے لیے)
// app.use(express.json()); 

// // اپ لوڈز فولڈر کو اسٹاٹک فائلز کے طور پر ایکسیس ایبل بنائیں
// // مثال: http://localhost:5000/uploads/filename.png
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// // ==================== ROOT ROUTE ====================
// // ٹیسٹنگ کے لیے ایک سادہ روٹ تاکہ پتا چلے سرور چل رہا ہے
// app.get("/", (req, res) => {
//   res.send("<h1>Server is running</h1>");
// });


// // ==================== API ROUTES ====================
// // امیج اپ لوڈ روٹ
// // اس کے لیے اصل یو آر ایل ہوگا: POST http://localhost:5000/api/uploadImage
// app.use("/api/uploadImage", uploadRoutes);

// // یوزر روٹس (CRUD آپریشنز کے لیے)
// app.use("/api/user", userRoutes); 


// // ==================== START SERVER ====================
// // پورٹ نمبر .env فائل سے یا پھر 5000
// const PORT = process.env.PORT || 5000;

// // سرور کو اسٹارٹ کریں اور ساتھ میں ڈیٹابیس سے کنکشن کریں
// app.listen(PORT, async () => {
//   await connectDB(); // ڈیٹابیس کنکشن

//   console.log(`🚀 Server is running on http://localhost:${PORT}`);
// });


// ایکسپریس فریم ورک امپورٹ کریں
const express = require("express");

// MongoDB سے کنکشن کرنے والا فنکشن امپورٹ کریں
const connectDB = require("./db/db"); 

// یوزر روٹس (CRUD APIs کے لیے)
const userRoutes = require("./routes/userRoutes"); 

// .env فائل سے ماحول کی ویری ایبلز لوڈ کریں
require("dotenv").config({ quiet: true });

// کلاؤڈینری اپ لوڈ روٹس (امیج اپ لوڈ کے لیے)
const uploadRoutes = require("./routes/uploadImageRoutes"); // ✅ use new file name

// ایکسپریس ایپ بنائیں
const app = express();

// ==================== MIDDLEWARE ====================
// JSON ڈیٹا کو پڑھنے کے لیے مڈل ویئر (req.body استعمال کرنے کے لیے)
app.use(express.json()); 

// ❌ اب ہمیں اپ لوڈز فولڈر کو اسٹاٹک فائلز کے طور پر ایکسیس ایبل بنانے کی ضرورت نہیں
// کیونکہ فائلز کلاؤڈینری پر جا رہی ہیں
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ==================== ROOT ROUTE ====================
// ٹیسٹنگ کے لیے ایک سادہ روٹ تاکہ پتا چلے سرور چل رہا ہے
app.get("/", (req, res) => {
  res.send("<h1>🚀 Server is running</h1>");
});

// ==================== API ROUTES ====================
// امیج اپ لوڈ روٹ
// اصل یو آر ایل ہوگا: POST http://localhost:5000/api/files/upload
app.use("/api/uploadImage", uploadRoutes);

const deleteUploadRoutes = require("./routes/deleteUploadImageRoutes");
app.use("/api/deleteImage", deleteUploadRoutes);


// یوزر روٹس (CRUD آپریشنز کے لیے)
app.use("/api/user", userRoutes);

// ==================== START SERVER ====================
// پورٹ نمبر .env فائل سے یا پھر 5000
const PORT = process.env.PORT || 5000;

// سرور کو اسٹارٹ کریں اور ساتھ میں ڈیٹابیس سے کنکشن کریں
app.listen(PORT, async () => {
  await connectDB(); // ڈیٹابیس کنکشن
  console.log(`Server is running on http://localhost:${PORT}`);
});
