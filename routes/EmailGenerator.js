const express = require('express');
const nodemailer = require('nodemailer');
const Router = new express.Router();
const { hiddenUsr, hiddenPass } = require('../.env')

//https://mailtrap.io/inboxes

Router.post('/send-email', (req, res) => {
    const { username, phoneNumber, email, message } = req.body;
    console.log(req.body)


    //testing working
    var transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: hiddenUsr,
            pass: hiddenPass
            // user: "e532262e2dd080",
            // pass: "84f7faec35f1f9"
        }
    });
    //for live web site
    // var transporter = nodemailer.createTransport({
    //     host: "live.smtp.mailtrap.io",
    //     port: 587,
    //     auth: {
    //       user: "api",
    //       pass: "fe93148676f15376e0a33ebda0a277e9"
    //     }
    //   });
    const mailOptions = {
        from: email,
        to: "enwiya.dev@gmail.com",
        // subject: subject,
        phone: phoneNumber,
        text: `Name: ${username}\n Phone: ${phoneNumber}\n Email: ${email}\n Message: ${message}`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error, transporter);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});
module.exports = Router
