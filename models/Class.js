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
    teacherName: {
        type: String
    },
    teacherId: {
        type: String
    },
    students: {
        type: Array
    }
});

module.exports = mongoose.model('Class', classSchema)