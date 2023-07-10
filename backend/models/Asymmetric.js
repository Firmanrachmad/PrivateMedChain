const mongoose = require("mongoose");

const asymmetricSchema = new mongoose.Schema({
    encryptedId: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("asymmetric", asymmetricSchema);