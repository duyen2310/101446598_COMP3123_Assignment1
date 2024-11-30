const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const employeeRoute = require('./routes/employee'); 
const userRoute = require('./routes/user'); 
require('dotenv').config();
const cors = require('cors');

// MongoDB connection string
const DB_URL = "mongodb+srv://truongthuykyduyen:jC5cACo4tsFG3NLf@mycluster.a0u4z.mongodb.net/comp3123_assigment1?retryWrites=true&w=majority&appName=MyCluster";

const app = express();

// Use CORS middleware globally
app.use(cors());

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set mongoose's promise library
mongoose.Promise = global.Promise;

// Connect to MongoDB
mongoose.connect(DB_URL, {}).then(() => {
    console.log("Successfully connected to the database MongoDB Atlas Server");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Use routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/emp", employeeRoute);

// Home route
app.get('/', (req, res) => {
    res.send("<h1>Welcome to Assignment 1</h1>");
});

// Start the server
app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});
