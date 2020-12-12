const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date
    },
    book: {
        type: String
    },
    localTeacherName: {
        type: String
    },
    localTeacherId: {
        type: String
    },
    foreignTeacher: {
        type: String
    },
    students: {
        type: Array
    }
});

module.exports = mongoose.model('Class', classSchema)