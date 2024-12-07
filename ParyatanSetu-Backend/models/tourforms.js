const mongoose = require('mongoose');

const TourFormSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    gender: String,
    experience: String,
    address: String,
    state: String,
    city: String,
    pincode: Number,
    mobileNo: Number,
    alternateNo: Number,
    email: { type: String, unique: true },
    photo: String,
    tourType: Array,
    languages: Array,
    availability: Array,
    hourlyRate: Number,
    fullDayRate: Number,
});

module.exports = mongoose.model('TourForm', TourFormSchema);