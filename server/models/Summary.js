const mongoose = require('mongoose');

const SummarySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        default: "10:00"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Summary', SummarySchema);
