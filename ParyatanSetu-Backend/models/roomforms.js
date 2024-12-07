const mongoose = require('mongoose');

const roomFormSchema = new mongoose.Schema({
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
    email: {type: String, unique: true},
    photo: String,
    roomType: String,
    noOfRooms: Number,
    acType: String,
    floorPreference: String,
    chargesPerHead: Number,
    electricityAvailability: Number,
    waterAvailability: Number,
});

module.exports  = mongoose.model('RoomForm', roomFormSchema);