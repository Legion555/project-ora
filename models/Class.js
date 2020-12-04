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
    localTeacher: {
        type: String
    },
    foreignTeacher: {
        type: String
    },
    students: {
        type: Number
    }
});

module.exports = mongoose.model('Class', classSchema)