// Import mongoose (ODM for MongoDB - helps interact with MongoDB using models)
const mongoose = require('mongoose');

// Load environment variables from .env file into process.env
// {quiet: true} prevents warnings if .env is missing
require('dotenv').config({ quiet: true });

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        // Use mongoose to connect to MongoDB
        // The connection string is stored in .env file as MONGODB_URI
        await mongoose.connect(process.env.MONGODB_URI);

        // If successful, log confirmation message
        console.log(' MongoDB connected');
    } catch (error) {
        // If connection fails, log error message
        console.error(' MongoDB connection error:', error.message);

        // Exit the process with failure (so app doesn't keep running without DB)
        process.exit(1);
    }
}

// Export the function so it can be used in server.js
module.exports = connectDB;

