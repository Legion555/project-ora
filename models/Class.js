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
    school: {
        type: Object,
        default: {'name': 'unassigned', 'id': 'unassigned'}
    },
    teacher: {
        type: Object,
        default: {'name': 'unassigned', 'id': 'unassigned'}
    },
    students: {
        type: Array
    }
    
});

module.exports = mongoose.model('Class', classSchema)