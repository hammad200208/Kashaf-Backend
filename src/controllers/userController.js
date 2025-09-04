// Import the User model (represents the "users" collection in MongoDB)
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({quiet:true})


// Helper: generate JWT
const generateToken = (id,name,email) => {
  return jwt.sign(
    { id,name,email },// payload
     process.env.JWT_SECRET, 
     {expiresIn: "7d"});
};



// ==================== CREATE USER ====================
// @desc    Create a new user
// @route   POST /api/users
// @access  Public (anyone can call this API)
const createUser = async (req, res) => {
  try {
    // Extract data from request body (sent by frontend or Postman)
    const { name, email, password } = req.body;

    // Check if a user already exists with the same email
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    

    // Create a new user in MongoDB
    const user = await User.create({ name, email, password: hashedPassword });

    // Respond with the created user object
    return res.status(200).json({
      status:200,
      message:"User successfully Created",
      user:user,
      token:generateToken(user._id,user.name,user.email), //send token on register
      });

  } catch (error) {
    // Handle server or database errors
    res.status(500).json({ message: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    return res.json({
      status: 200,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token: generateToken(user._id,user.name,user.email), // send JWT token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ==================== GET ALL USERS ====================
// @desc    Fetch all users
// @route   GET /api/users
// @access  Public
const getUsers = async (req, res) => {
  try {
    // Fetch all users from database
    const users = await User.find();

    // Send users as JSON response
    return res.status(200).json({status:200,message:"AllUsers successfully fetched", user:users});
  }
   catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ==================== GET USER BY ID ====================
// @desc    Fetch single user by ID
// @route   GET /api/users/:id
// @access  Public
const getUserById = async (req, res) => {
  try {
    // Find user by MongoDB _id (from request params)
    const user = await User.findById(req.params.id);

    // If user not found, return 404
    if (!user) return res.status(404).json({ message: "User not found" });

    // Return the found user
    return res.status(200).json({status:200,message:"User successfully fetched", user:user});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ==================== UPDATE USER ====================
// @desc    Update existing user
// @route   PUT /api/users/:id
// @access  Public
const updateUser = async (req, res) => {
  try {
    // Find user by ID and update with request body data
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body, // new data
      { new: true } // return the updated user instead of old one
    );

    // If user not found, return 404
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    // Send updated user object as response
    return res.status(200).json({status:200,message:"User successfully Updated", user:updatedUser});
    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// ==================== DELETE USER ====================
// @desc    Delete user by ID
// @route   DELETE /api/users/:id
// @access  Public
const deleteUser = async (req, res) => {
  try {
    // Find user by ID and delete
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    // If user not found, return 404
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    // Respond with success message
    res.status(200).json({status:200 ,message: "User deleted successfully",user:deletedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Export all controller functions so routes can use them
module.exports = {
  createUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
