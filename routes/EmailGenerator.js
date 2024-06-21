require("dotenv").config();
// const source = require("../utils/index.html");
const express = require("express");
const Router = new express.Router();
const nodemailer = require("nodemailer");
const fs = require("fs");

const source = fs.readFileSync("utils/index.html", "utf8");
owner = process.env.G_USER;

Router.post("/send-email", (req, res) => {
  const { email, customName, message, phoneNumber } = req.body;
  console.log(req.body);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      // user: process.env.G_USER,
      // pass: process.env.G_PASS,
      user: process.env.G_USER,
      pass: process.env.G_PASS,
    },
  });

  const mailOptions = {
    // from: {
    //   name: "ESS.LLC",
    //   address: process.env.G_USER,
    // },
    from: "ESS, LLC",
    to: process.env.G_USER,
    subject: `Message from ${customName}`,
    html: source
      .replaceAll("Your Name", customName)
      .replaceAll("Email", email)
      .replaceAll("Message", message)
      .replaceAll("PhoneNumber", phoneNumber),
    // to: owner,
    // subject: `Notification`,
    // text: `${customName} is trying to reach you`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error occurred:", error.message);
      res.status(500).send("Error occurred while sending email.");
    } else {
      console.log("Email sent successfully!");
      res.status(200).send("Email sent successfully!");
    }
  });
});
module.exports = Router;
