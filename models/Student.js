const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
	address: {
        type: String
    },
	contactNumber: {
        type: String
    },
	class: {
        type: String
    }
});

module.exports = mongoose.model('Student', studentSchema)