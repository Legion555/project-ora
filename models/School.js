const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
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
	manager: {
        type: Object
    },
	teachers: {
        type: Array
    },
    classes: {
        type: Array
    }
});

module.exports = mongoose.model('School', schoolSchema)