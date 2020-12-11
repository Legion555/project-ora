const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    isAuthed: {
        type: Boolean,
        required: true,
        default: false
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    authority: {
        type: String,
        required: true,
        default: 'teacher'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema)