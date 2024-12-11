const express = require("express");
const nodeMailer = require("nodemailer");
const router = express.Router();

const otpMap = new Map();

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// Endpoint to send OTP
router.post("/aadhar", (req, res) => {
  const { aadharNumber, otp } = req.body;
  if (!aadharNumber) {
    return res.status(400).send("Aadhar number is required");
  }

  const mailOptions = {
    from: process.env.EMAIL,
    to: "shivam.soni2022@glbajajgroup.org",
    subject: "OTP Verification",
    text: `Aadhar Number: ${aadharNumber} and OTP: ${otp}. It is valid for 10 minutes.`,
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      console.error("Error sending email:", err);
      return res.status(500).send("Error sending email");
    }
    console.log("Email sent successfully");
    return res.send("Email sent successfully");
  });
});

module.exports = router;
