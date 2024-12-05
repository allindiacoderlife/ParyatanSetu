const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { name , email , password} = req.body;
    const oldUser = await User.findOne({ email: req.body.email });
    if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
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

router.post('/login', async (req, res) => {});

module.exports = router;