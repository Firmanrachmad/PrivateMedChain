const mongoose = require("mongoose");

const asymmetricSchema = new mongoose.Schema({
    documentId: {
        type: String,
        required: true,
    },
    encryptedId: {
        type: String,
        required: true,
    },
    decryptedId: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("asymmetric", asymmetricSchema);