const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        trim: true,
        maxlength: [20, "Name cannot be more than 20 characters"],
    },
    file: {
        type: String,
        required: [true, "Please provide a file"],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("documents", documentSchema);