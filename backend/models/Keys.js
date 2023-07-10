const mongoose = require("mongoose");

const keySchema = new mongoose.Schema({
    publicKeys: {
        type: String,
        required: true,
    },
    privateKeys: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("key", keySchema);