const express = require("express");
const axios = require("axios");
const router = express.Router();

const url = process.env.BOOKING;
const api = process.env.API;
const host = process.env.HOST;

const Flight = require("../models/flight");
const Output = require("../models/output");

let location = [];

let formIds = "";
let toIds = "";

let output = "";

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
    console.log(location);
  } catch (error) {
    console.error(error);
  }
};

const handleSearchFlight = async (FormId, ToId, StartData, EndDate) => {
  const options = {
    method: "GET",
    url: `${url}flights/searchFlights`,
    params: {
      fromId: FormId,
      toId: ToId,
      departDate: StartData,
      returnDate: EndDate,
      pageNo: "1",
      adults: "1",
      children: "0,17",
      sort: "BEST",
      cabinClass: "ECONOMY",
      currency_code: "INR",
    },
    headers: {
      "x-rapidapi-key": api,
      "x-rapidapi-host": host,
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

router.post("/feed", async (req, res) => {
  const { name, uid } = req.query; // Access query parameters
  const existingOutput = await Output.findOne({ uid });
  if (existingOutput) {
    await Output.updateOne({ uid }, { message: name });
    res.send(`${name}`);
  } else {
    if (name) {
      await Output.create({ message: name, uid: uid });
      res.send(`${name}`);
    } else {
      res.status(400).send("Name query parameter is missing.");
    }
  }
});

router.get("/feed", async (req, res) => {
  const { uid } = req.query; // Access query parameters
  try {
    const existingOutput = await Output.findOne({ uid });
    if (existingOutput) {
      res.send({ status: "Ok", data: existingOutput });
    }
  } catch (err) {
    res.send({ status: "error", data: err });
    console.log(err);
  }
});

module.exports = router;
