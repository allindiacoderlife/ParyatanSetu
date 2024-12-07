const mongoose = require('mongoose');

const CarFormSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        age: Number,
        gender: String,
        address: String,
        state: String,
        city: String,
        pincode: Number,
        mobileNo: Number,
        alternateNo: Number,
        email: { type: String, unique: true },
        photo: String,
        model: String,
        registrationNo: String,
        seatingCapacity: Number,
        mileage: Number,
        yearOfManufacture: Number,
        pricePerHead: Number,
        availability: Array,
    },
    {
        collation: { locale: 'en', strength: 1 },
    }
);

module.exports = mongoose.model('CarForms', CarFormSchema);

