const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const employeeRoute = require('./routes/employee'); 
const userRoute = require('./routes/user'); 



const DB_URL = "mongodb+srv://truongthuykyduyen:R2YYaUii0fPspBwk@mycluster.a0u4z.mongodb.net/comp3123_assigment1?retryWrites=true&w=majority&appName=MyCluster";
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.Promise = global.Promise;

// TODO - Update your mongoDB Atals Url here to Connect to the database
mongoose.connect(DB_URL, {
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
app.use("/api/v1/user",userRoute);

app.use("/api/v1/emp",employeeRoute);
app.get('/', (req, res) => {
    res.send("<h1>Welcome to Assignment 2</h1>");
});


app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});