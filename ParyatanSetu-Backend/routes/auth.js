const express = require("express");
const User = require("../models/user");
const Provider = require("../models/provider");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

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

router.post("/send" , async (req , res) => {
    const { email , message } = req.body;
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    let mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: `Message from ${process.env.EMAIL}`,
        text: message
    };
    transporter.sendMail(mailOptions , (err , data) => {
        if(err){
            console.log(err);
            return res.send({ status: "error", data: err });
        }else{
            console.log('Email sent');
            return res.send({ status: "Ok", data: "Email sent" });
        }
    });
    res.send('Email sent');
})

module.exports = router;
