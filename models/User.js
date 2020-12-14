const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    authority: {
        type: String,
        required: true
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
        default: 'admin'
    },
    date: {
        type: Date,
        default: Date.now
    },
    //Teacher & Manager
    isAuthed: {
        type: Boolean,
        required: true,
        default: false
    },
    school: {
        type: Object,
        default: {'schoolName': 'unassigned', 'schoolId': 'unassigned'}
    },
    //Teacher
    classes: {
        type: Array
    },
});

module.exports = mongoose.model('User', userSchema)