const express = require("express");
const User = require("../models/user");
const Provider = require("../models/provider");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/register/user", async (req, res) => {
  const {
    name,
    email,
    password,
    userType,
    accounts,
    paymentHistory,
    savedTrips,
    bookings,
  } = req.body;
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
      userType: userType,
      accounts: accounts,
      paymentHistory: paymentHistory,
      savedTrips: savedTrips,
      bookings: bookings,
    });
    res.send({ status: "Ok", data: "User created" });
    console.log("User created");
  } catch (err) {
    res.send({ status: "error", data: err });
    console.log(err);
  }
});

router.post("/register/provider", async (req, res) => {
  const {
    name,
    email,
    password,
    serviceType,
    userType,
    accounts,
    paymentHistory,
    savedTrips,
    bookings,
  } = req.body;
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
      serviceType: serviceType,
      userType: userType,
      accounts: accounts,
      paymentHistory: paymentHistory,
      savedTrips: savedTrips,
      bookings: bookings,
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

router.post("/send", async (req, res) => {
  const { email, message } = req.body;
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  let mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: `Message from ${process.env.EMAIL}`,
    text: message,
  };
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err);
      return res.send({ status: "error", data: err });
    } else {
      console.log("Email sent");
      return res.send({ status: "Ok", data: "Email sent" });
    }
  });
  res.send("Email sent");
});

router.get("/user/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.send({ status: "error", data: "User not found" });
    }
    res.send({ status: "Ok", data: user });
  } catch (err) {
    res.send({ status: "error", data: err });
    console.log(err);
  }
});

router.get("/provider/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const provider = await Provider.findOne({ email: email });
    if (!provider) {
      return res.send({ status: "error", data: "Provider not found" });
    }
    res.send({ status: "Ok", data: provider });
  } catch (err) {
    res.send({ status: "error", data: err });
    console.log(err);
  }
});

router.post("/feedback", async (req, res) => {
  const { name, email, feedback } = req.body;
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  let mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: `Feedback from ${email} Name is ${name}`,
    text: feedback,
  };
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err);
      return res.send({ status: "error", data: err });
    } else {
      console.log("Email sent");
      return res.send({ status: "Ok", data: "Email sent" });
    }
  });
  res.send("Email sent");
});

router.delete("/delete/user/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOneAndDelete({ email: email });
    if (!user) {
      return res.send({ status: "error", data: "User not found" });
    }
    res.send({ status: "Ok", data: "User deleted" });
  } catch (err) {
    res.send({ status: "error", data: err });
    console.log(err);
  }
});

module.exports = router;
