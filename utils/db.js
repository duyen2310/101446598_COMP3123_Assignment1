const mongoose = require('mongoose');

const DB_URL = "mongodb+srv://truongthuykyduyen:jC5cACo4tsFG3NLf@mycluster.a0u4z.mongodb.net/comp3123_assigment1?retryWrites=true&w=majority&appName=MyCluster";

let isConnected = false;

async function connectToDatabase() {
    if (isConnected) {
        console.log("Already connected to the database.");
        return;
    }

    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log("Successfully connected to MongoDB Atlas.");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process on failure
    }
}

module.exports = { connectToDatabase };
