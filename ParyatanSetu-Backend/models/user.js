const mongoose = require('mongoose');

const UserDetailsSchema = new mongoose.Schema(
    {
        name: String,
        email: { type: String, unique: true },
        password: String,
        userType: String,
        accounts: Array,
        paymentHistory: Array,
        savedTrips: Array,
        bookings: Array,
    },
    {
        collation: { locale: 'en', strength: 1 },
    }
);

module.exports = mongoose.model('User', UserDetailsSchema);

