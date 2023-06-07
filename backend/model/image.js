const mongoose = require('mongoose');
// Schema for users of app
const ImageSchema = new mongoose.Schema({
	image: {
		type: String,
		required: true,
	},
	key: {
		type: String,
		required: true,
	}
});

module.exports = ImageSchema;