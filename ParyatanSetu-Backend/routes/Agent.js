const express = require("express");
const axios = require("axios");
const router = express.Router();

const url = process.env.BOOKING;
const api = process.env.API;
const host = process.env.HOST;

const Flight = require("../models/flight");

let location = [];

let formIds = "";
let toIds = "";

router.post("/agent", async (req, res) => {
  const {
    formId,
    toId,
    startData,
    endDate,
    budget,
    minPrice,
    maxPrice,
    preferences,
    chat,
  } = req.body;

    handleSearchFlightLoc(formId);
    formIds = location.data[0].id;
    handleSearchFlightLoc(toId);
    toIds = location.data[0].id;
    handleSearchFlight(formIds , toIds , startData , endDate);

    try{
      await Flight.create({
        formId: formIds,
        toId: toIds,
        startData: startData,
        endDate: endDate,
        budget: budget,
        minPrice: minPrice,
        maxPrice: maxPrice,
        preferences: preferences,
        chat: chat,
      });
      res.send({ status: "Ok", data: "Flight created" });
      console.log("Flight created");
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
    console.log(location);
  } catch (error) {
    console.error(error);
  }
};

const handleSearchFlight = async (FormId , ToId , StartData , EndDate) => {
    const options = {
        method: "GET",
        url: `${url}flights/searchFlights`,
        params: {
            fromId: FormId,
            toId: ToId,
            departDate: StartData,
            returnDate: EndDate,
            pageNo: '1',
            adults: '1',
            children: '0,17',
            sort: 'BEST',
            cabinClass: 'ECONOMY',
            currency_code: 'INR'
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
} 

router.post("/feed", async (req, res) => {
  const {output} = req.body;

  const out = output;
  console.log(out);
});

module.exports = router;
