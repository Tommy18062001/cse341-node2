const mongoose = require("mongoose");

// create a model for each student
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
})

module.exports = mongoose.model('user', userSchema);