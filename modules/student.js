const mongoose = require("mongoose");

// create a model for each student
const studentSchema = new mongoose.Schema({
    id: { type: String},
    firstName: { type: String, required: true },
    lastName: { type: String },
    startDate: { type: String },
    email: { type: String },
    major: { type: String },
    courses: [String],
    isGraduated: {type: Boolean}
})

module.exports = mongoose.model('student', studentSchema);