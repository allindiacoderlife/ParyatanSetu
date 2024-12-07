const mongoose = require('mongoose');


const FoodFormSchema = new mongoose.Schema({
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
    foodType: String,
    foodItems: Array,
    pricePerMeal: Number,
    pricePerPerson: Number,
    specialization: String,
    amenities: Array,
    openingTime: String,
    closingTime: String,
  });

  module.exports = mongoose.model('FoodForm', FoodFormSchema);
  