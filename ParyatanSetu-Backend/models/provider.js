const mongoose = require('mongoose');

const ProviderSchema = new mongoose.Schema(
    {
        name: String,
        email: { type: String, unique: true },
        password: String,
        userType: String,
        serviceType: String,
        accounts: Array,
        paymentHistory: Array,
        savedTrips: Array,
        bookings: Array,
    },
    {
        collation: { locale: 'en', strength: 1 },
    }
);

module.exports = mongoose.model('Provider', ProviderSchema);

