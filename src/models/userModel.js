// Import mongoose to define schema and interact with MongoDB
const mongoose = require("mongoose");

// Define the schema (blueprint) for the "User" collection
const userSchema = new mongoose.Schema(
    {
        // User's full name
        name: {
            type: String,                  // Data type: String
            required: [true, "Name is Required"], // Validation: must be provided
        },
        // User's email address
        email: {
            type: String,                  // Data type: String
            required: [true, "Email is Required"], // Validation: must be provided
            unique: true,                  // Ensures no two users have the same email
        },
        // User's password
        password: {
            type: String,                  // Data type: String
            required: [true, "Password is Required"], // Validation: must be provided
        },
    },
    {
        // Adds createdAt and updatedAt fields automatically
        timestamps: true,
    }
);

// Create a model called "User" based on the schema
// This maps to a "users" collection in MongoDB
module.exports = mongoose.model("User", userSchema);
