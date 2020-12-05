const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Student', studentSchema)