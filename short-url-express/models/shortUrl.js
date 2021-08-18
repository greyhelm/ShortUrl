const mongoose = require('mongoose');
const shortenUrl = require('../services/shortenUrl');

// define schema, save original, short and usage data
const URLSchema = mongoose.Schema({
    original : {
        type: String,
        required: true
    },
    short : {
        type: String,
        required: true,
        default: shortenUrl
    },
    linkUsage : {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model('ShortUrl', URLSchema);