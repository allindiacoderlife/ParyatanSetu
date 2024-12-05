const mongoose = require('mongoose');

const ProviderSchema = new mongoose.Schema(
    {
        name: String,
        email: { type: String, unique: true },
        password: String,
        serviceType: String,
    },
    {
        collation: { locale: 'en', strength: 1 },
    }
);

module.exports = mongoose.model('Provider', ProviderSchema);

