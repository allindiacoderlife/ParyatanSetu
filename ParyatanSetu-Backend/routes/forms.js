const express = require("express");
const router = express.Router();

const CarForm = require("../models/forms");
const FoodForm = require("../models/foodforms");
const TourForm = require("../models/tourforms");
const RoomForm = require("../models/roomforms");

router.post("/carform", async (req, res) => {
  const {
    firstName,
    lastName,
    age,
    gender,
    address,
    state,
    city,
    pincode,
    mobileNo,
    alternateNo,
    email,
    photo,
    model,
    registrationNo,
    seatingCapacity,
    mileage,
    yearOfManufacture,
    pricePerHead,
    availability,
  } = req.body;

  const oldCarForm = await CarForm.findOne({ email: req.body.email });

  if (oldCarForm) {
    return res.send({ status: "error", data: "Car Form already exists" });
  }

  try {
    await CarForm.create({
      firstName,
      lastName,
      age,
      gender,
      address,
      state,
      city,
      pincode,
      mobileNo,
      alternateNo,
      email,
      photo,
      model,
      registrationNo,
      seatingCapacity,
      mileage,
      yearOfManufacture,
      pricePerHead,
      availability,
    });
    res.send({ status: "Ok", data: "Car Form created" });
    console.log("Car Form created");
  } catch (err) {
    res.send({ status: "error", data: err });
  }
});

router.get("/carform/:email", async (req, res) => {
  const carForm = await CarForm.findOne({ email: req.params.email });
  res.send(carForm);
});

router.post("/foodform", async (req, res) => {
  const {
    firstName,
    lastName,
    age,
    gender,
    address,
    state,
    city,
    pincode,
    mobileNo,
    email,
    alternateNo,
    photo,
    foodType,
    foodItems,
    pricePerMeal,
    pricePerPerson,
    specialization,
    amenities,
    openingTime,
    closingTime,
  } = req.body;

  const oldFoodForm = await FoodForm.findOne({ email: req.body.email });

  if (oldFoodForm) {
    return res.send({ status: "error", data: "Food Form already exists" });
  }

  try {
    await FoodForm.create({
      firstName: firstName,
      lastName: lastName,
      age: age,
      gender: gender,
      address: address,
      state: state,
      city: city,
      pincode: pincode,
      mobileNo: mobileNo,
      email: email,
      alternateNo: alternateNo,
      photo: photo,
      foodType: foodType,
      foodItems: foodItems,
      pricePerMeal: pricePerMeal,
      pricePerPerson: pricePerPerson,
      specialization: specialization,
      amenities: amenities,
      openingTime: openingTime,
      closingTime: closingTime,
    });
    res.send({ status: "Ok", data: "Food Form created" });
    console.log("Food Form created");
  } catch (err) {
    res.send({ status: "error", data: err });
  }
});

router.get("/foodform/:email", async (req, res) => {
  const foodForm = await FoodForm.findOne({ email: req.params.email });
  res.send(foodForm);
});

router.post("/tourform", async (req, res) => {
  const {
    firstName,
    lastName,
    age,
    gender,
    experience,
    address,
    state,
    city,
    pincode,
    mobileNo,
    alternateNo,
    email,
    photo,
    tourType,
    languages,
    availability,
    hourlyRate,
    fullDayRate,
  } = req.body;

  const oldTourForm = await TourForm.findOne({ email: req.body.email });

  if (oldTourForm) {
    return res.send({ status: "error", data: "Tour Form already exists" });
  }

  try {
    await TourForm.create({
      firstName: firstName,
      lastName: lastName,
      age: age,
      gender: gender,
      experience: experience,
      address: address,
      state: state,
      city: city,
      pincode: pincode,
      mobileNo: mobileNo,
      alternateNo: alternateNo,
      email: email,
      photo: photo,
      tourType: tourType,
      languages: languages,
      availability: availability,
      hourlyRate: hourlyRate,
      fullDayRate: fullDayRate,
    });
    res.send({ status: "Ok", data: "Tour Form created" });
    console.log("Tour Form created");
  } catch (err) {
    res.send({ status: "error", data: err });
  }
});

router.get("/tourform/:email", async (req, res) => {
  const tourForm = await TourForm.findOne({ email: req.params.email });
  res.send(tourForm);
});

router.post("/roomform", async (req, res) => {
  const {
    firstName,
    lastName,
    age,
    gender,
    address,
    state,
    city,
    pincode,
    mobileNo,
    alternateNo,
    email,
    photo,
    roomType,
    noOfRooms,
    acType,
    floorPreference,
    chargesPerHead,
    electricityAvailability,
    waterAvailability,
  } = req.body;

  const oldRoomForm = await RoomForm.findOne({ email: req.body.email });

  if (oldRoomForm) {
    return res.send({ status: "error", data: "Room Form already exists" });
  }

  try {
    await RoomForm.create({
      firstName: firstName,
      lastName: lastName,
      age: age,
      gender: gender,
      address: address,
      state: state,
      city: city,
      pincode: pincode,
      mobileNo: mobileNo,
      alternateNo: alternateNo,
      email: email,
      photo: photo,
      roomType: roomType,
      noOfRooms: noOfRooms,
      acType: acType,
      floorPreference: floorPreference,
      chargesPerHead: chargesPerHead,
      electricityAvailability: electricityAvailability,
      waterAvailability: waterAvailability,
    });
    res.send({ status: "Ok", data: "Room Form created" });
    console.log("Room Form created");
  } catch (err) {
    res.send({ status: "error", data: err });
  }
});

router.get("/roomform/:email", async (req, res) => {
  const room = await RoomForm.findOne({ email: req.params.email });
  res.send(room);
});
module.exports = router;
