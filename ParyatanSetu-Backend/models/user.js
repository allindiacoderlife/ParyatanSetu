const mongoose = require('mongoose');

const UserDetailsSchema = new mongoose.Schema(
    {
        name: String,
        phone: String,
        email: { type: String, unique: true },
        password: String,
    },
    {
        collation: { locale: 'en', strength: 1 },
    }
);

module.exports = mongoose.model('UserInfo', UserDetailsSchema);

