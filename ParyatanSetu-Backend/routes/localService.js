const express = require("express");

const router = express.Router();

const Car = require("../models/forms");

router.get("/form/car", async (req, res) => {
  const { city, date } = req.query;
  const result = findDayFromDate(date);
  console.log(result);
  try {
    const car = await Car.find({ city: city, availability: result });
    res.send({ status: "Ok", data: car });
  } catch (err) {
    res.send({ status: "error", data: err });
    console.log(err);
  }
});

function findDayFromDate(dateString) {
  // Parse the input date string
  const inputDate = new Date(dateString);

  // Check if the date is valid
  if (isNaN(inputDate)) {
    return "Invalid date format. Please use YYYY-MM-DD.";
  }

  // Days of the week array
  const daysOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  // Get the day index and return the day name
  const dayIndex = inputDate.getDay();
  return `${daysOfWeek[dayIndex]}`;
}

module.exports = router;
