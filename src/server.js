const express = require('express');
const app = express();
const connectDB = require('./db/db'); 
require('dotenv').config({quiet: true});

app.get('/', (req, res) => {
    res.send("<h1>Server is running</h2>");
});

app.listen(process.env.PORT, () => {
    connectDB();
    console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});