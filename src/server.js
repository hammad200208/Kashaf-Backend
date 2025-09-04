// Import express framework
const express = require("express");

// Import MongoDB connection function
const connectDB = require("./db/db"); 

const path = require("path");


// Import user routes (all CRUD APIs for User)
const userRoutes = require("./routes/userRoutes"); 

// Load environment variables from .env file
require("dotenv").config({ quiet: true });

const uploadRoutes = require("./routes/uploadImageRoutes");

// Create an express app
const app = express();


// ==================== MIDDLEWARE ====================
// Middleware to parse incoming JSON requests (req.body)
app.use(express.json()); 
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ==================== ROOT ROUTE ====================
// Default route for testing server is running
app.get("/", (req, res) => {
  res.send("<h1>Server is running</h1>");
});


// ==================== API ROUTES ====================
// Any request starting with /api/users will use userRoutes
// Example: GET /api/users , POST /api/users
app.use("/api/uploadImage", uploadRoutes);
app.use("/api/user", userRoutes); 


// ==================== START SERVER ====================
// Get PORT from .env or fallback to 5000
const PORT = process.env.PORT || 5000;

// Start server and connect to MongoDB
app.listen(PORT, async () => {
  // conn
  await connectDB();

  // Log that server is running
  console.log(` Server is running on http://localhost:${PORT}`);
});