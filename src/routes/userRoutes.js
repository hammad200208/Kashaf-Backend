// Import express to create a router
const express = require("express");

// Import controller functions (logic for each route)
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// Create a new router object
const router = express.Router();

// ==================== ROUTES ====================

// @route   POST /api/users
// @desc    Create a new user
// @access  Public
router.post("/", createUser);

// @route   GET /api/users
// @desc    Get all users
// @access  Public
router.get("/", getUsers);

// @route   GET /api/users/:id
// @desc    Get a single user by ID
// @access  Public
router.get("/:id", getUserById);

// @route   PUT /api/users/:id
// @desc    Update user by ID
// @access  Public
router.put("/:id", updateUser);

// @route   DELETE /api/users/:id
// @desc    Delete user by ID
// @access  Public
router.delete("/:id", deleteUser);

// Export the router so it can be used in server.js
module.exports = router;
