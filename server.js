// ایکسپریس فریم ورک امپورٹ کریں
const express = require("express");
const path = require("path");
const fs = require("fs");

// MongoDB سے کنکشن کرنے والا فنکشن امپورٹ کریں
const connectDB = require("./src/db/db");

// یوزر روٹس (CRUD APIs کے لیے)
const userRoutes = require("./src/routes/userRoutes");

// .env فائل سے ماحول کی ویری ایبلز لوڈ کریں
require("dotenv").config({ quiet: true });

// کلاؤڈینری اپ لوڈ روٹس (امیج اپ لوڈ کے لیے)
const uploadRoutes = require("./src/routes/uploadImageRoutes"); // ✅ use new file name

// 🟢 Swagger import
const swaggerDocument = require("./swagger.js");
const swaggerUi = require("./swaggerhtml.js");
const app = express();
app.get("/docs.json", (req, res) => {
  res.json(swaggerDocument);
});

// Custom Swagger UI (HTML)
app.get('/api-docs',(req,res)=>{
    res.setHeader('Content-Type', 'text/html');
    res.send(swaggerUi);
})
// ایکسپریس ایپ بنائیں


// ==================== MIDDLEWARE ====================
// JSON ڈیٹا کو پڑھنے کے لیے مڈل ویئر (req.body استعمال کرنے کے لیے)
app.use(express.json());

// ==================== ROOT ROUTE ====================
// ٹیسٹنگ کے لیے ایک سادہ روٹ تاکہ پتا چلے سرور چل رہا ہے
app.get("/", (req, res) => {
  res.send("<h1>🚀 Server is running</h1>");
});

// ==================== API ROUTES ====================
// امیج اپ لوڈ روٹ
// اصل یو آر ایل ہوگا: POST http://localhost:5000/api/files/upload
app.use("/api/uploadImage", uploadRoutes);

const deleteUploadRoutes = require("./src/routes/deleteUploadImageRoutes");
app.use("/api/deleteImage", deleteUploadRoutes);

// یوزر روٹس (CRUD آپریشنز کے لیے)
app.use("/api/user", userRoutes);

// ==================== SWAGGER DOCS ====================
// JSON version


// ==================== START SERVER ====================
// پورٹ نمبر .env فائل سے یا پھر 5000
const PORT = process.env.PORT || 5000;

// سرور کو اسٹارٹ کریں اور ساتھ میں ڈیٹابیس سے کنکشن کریں
app.listen(PORT, async () => {
  await connectDB(); // ڈیٹابیس کنکشن
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`📄 Swagger JSON available at http://localhost:${PORT}/docs.json`);
  console.log(`🌐 Swagger UI available at http://localhost:${PORT}/api-docs`);
});
