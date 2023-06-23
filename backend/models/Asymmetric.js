const mongoose = require("mongoose");

const asymmetricSchema = new mongoose.Schema({
    publickey: {
        type: String,
        required: true,
    },
    privatekey: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("asymmetric", asymmetricSchema);