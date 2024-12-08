const mongoose = require('mongoose');

const OutputSchema = new mongoose.Schema(
    {
        message: String,
        uid: String,
    },
    {
        collation: { locale: 'en', strength: 1 },
    }
);

module.exports = mongoose.model('Output', OutputSchema);