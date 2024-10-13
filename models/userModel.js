const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
"username": String,
 "email": String,
 "password": String, // This should be hashed
 "created_at": { type: Date, default: Date.now },
 "updated_at": { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

