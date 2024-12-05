const express = require("express");
const User = require("../models/user");
const Provider = require("../models/provider");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/register/user", async (req, res) => {
  const { name, email, password } = req.body;
  const oldUser = await User.findOne({ email: req.body.email });
  if (oldUser) {
    return res.send({ status: "error", data: "user already exists" });
  }
  const encyptedPassword = await bcrypt.hash(password, 10);
  try {
    await User.create({
      name: name,
      email: email,
      password: encyptedPassword,
    });
    res.send({ status: "Ok", data: "User created" });
    console.log("User created");
  } catch (err) {
    res.send({ status: "error", data: err });
    console.log(err);
  }
});

router.post("/register/provider", async (req, res) => {
  const { name, email, password, type } = req.body;
  const oldProvider = await Provider.findOne({ email: req.body.email });
  if (oldProvider) {
    return res.send({
      status: "error",
      data: "Provider Already Exist. Please Login",
    });
  }
  const encyptedPassword = await bcrypt.hash(password, 10);
  try {
    await Provider.create({
      name: name,
      email: email,
      password: encyptedPassword,
      type: type,
    });
    res.send({ status: "Ok", data: "Provider created" });
    console.log("Provider created");
  } catch (err) {
    res.send({ status: "error", data: err });
    console.log(err);
  }
});

router.post("/login/user", async (req, res) => {
  const { email, password } = req.body;
  const oldUser = await User.findOne({ email: req.body.email });
  if (!oldUser) {
    return res.send({ status: "error", data: "User not found" });
  }
  if (await bcrypt.compare(password, oldUser.password)) {
    const token = jwt.sign({ email: oldUser.email }, JWT_SECRET);
    if (res.status(201)) {
      return res.send({ status: "Ok", data: "Success", token: token });
    } else {
      return res.send({ status: "error", data: "Invalid password" });
    }
  } else {
    return res.send({ status: "error", data: "Invalid password" });
  }
});

router.post("/login/provider", async (req, res) => {
  const { email, password } = req.body;
  const oldProvider = await Provider.findOne({ email: req.body.email });
  if (!oldProvider) {
    return res.send({ status: "error", data: "Provider not found" });
  }
  if (await bcrypt.compare(password, oldProvider.password)) {
    const token = jwt.sign({ email: oldProvider.email }, JWT_SECRET);
    if (res.status(201)) {
      return res.send({ status: "Ok", data: "Success", token: token });
    } else {
      return res.send({ status: "error", data: "Invalid password" });
    }
  } else {
    return res.send({ status: "error", data: "Invalid password" });
  }
});

module.exports = router;
