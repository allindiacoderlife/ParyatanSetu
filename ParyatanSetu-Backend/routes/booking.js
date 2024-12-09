const express = require("express");
const router = express.Router();

const axios = require("axios");

const Flight = require("../models/flight");

const api = process.env.API;
const host = process.env.HOST;
const url = process.env.BOOKING;

let location = [];
let flight = [];

router.post("/flight", async (req, res) => {
  const {
    tripType,
    departure,
    arrival,
    departureDate,
    returnDate,
    adults,
    children,
    infants,
    cabinClass,
  } = req.body;

  let departureId = "";
  let arrivalId = "";
  let flightDetails = [];

  await handleSearchFlightLoc(departure);
  departureId = location.data[0].id;
  console.log(departureId);

  await handleSearchFlightLoc(arrival);
  arrivalId = location.data[0].id;
  console.log(arrivalId);

  await handleSearchFlight(
    departureId,
    arrivalId,
    departureDate,
    returnDate,
    adults,
    cabinClass
  );
  flightDetails = flight.data;
  console.log(flightDetails);

  try {
    await Flight.create({
      tripType: tripType,
      departure: departure,
      arrival: arrival,
      departureDate: departureDate,
      returnDate: returnDate,
      adults: adults,
      children: children,
      infants: infants,
      cabinClass: cabinClass,
      flights: flightDetails,
    });
    res.send({ status: "Ok", data: "Flight created" });
  } catch (err) {
    res.send({ status: "error", data: err });
    console.log(err);
  }
});

router.get("/flight", async (req, res) => {
  const { departure, arrival, departureDate, returnDate } = req.query;
  try {
    const flight = await Flight.find({
      departure: req.query.departure,
      arrival: req.query.arrival,
      departureDate: req.query.departureDate,
      returnDate: req.query.returnDate,
    });
    res.send({ status: "Ok", data: flight });
  } catch (err) {
    res.send({ status: "error", data: err });
    console.log(err);
  }
});

const handleSearchFlightLoc = async (data) => {
  const options = {
    method: "GET",
    url: `${url}flights/searchDestination`,
    params: {
      query: data,
      languagecode: "en-us",
    },
    headers: {
      "x-rapidapi-key": api,
      "x-rapidapi-host": host,
    },
  };
  try {
    const response = await axios.request(options);
    location = response.data;
    return location;
  } catch (error) {
    console.error(error);
  }
};

const handleSearchFlight = async (
  FormId,
  ToId,
  StartData,
  EndDate,
  Adults,
  CabinClass
) => {
  const options = {
    method: "GET",
    url: `${url}flights/searchFlights`,
    params: {
      fromId: FormId,
      toId: ToId,
      departDate: StartData,
      returnDate: EndDate,
      pageNo: "1",
      adults: Adults,
      children: "0,17",
      sort: "BEST",
      cabinClass: CabinClass,
      currency_code: "INR",
    },
    headers: {
      "x-rapidapi-key": api,
      "x-rapidapi-host": host,
    },
  };

  try {
    const response = await axios.request(options);
    flight = response.data;
    return flight;
  } catch (error) {
    console.error(error);
  }
};

module.exports = router;
