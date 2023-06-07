const mongoose = require('mongoose');
// Schema for users of app
const DocumentSchema = new mongoose.Schema({
	filename: {
        type: String,
        required: true
    },
    date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = DocumentSchema;