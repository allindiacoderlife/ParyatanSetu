const mongoos = require("mongoose");

const flightSchema = new mongoos.Schema({
  tripType: String,
  departure: String,
  arrival: String,
  departureDate: String,
  returnDate: String,
  adults: String,
  children: String,
  infants: String,
  cabinClass: String,
  flights: Array,
});

module.exports = mongoos.model("Flight", flightSchema);
