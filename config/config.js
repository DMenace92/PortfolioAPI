const express = require("express");

//live server

// let config = 'mongodb+srv://dennisenwiya:kibwsrM2E5RiOZqz@cluster0.au3bh2l.mongodb.net/pizzaAPI'
// let tConfig = 'pizzaAPI'

//local server

let config = process.env.MONGO_URL;
let tConfig = "profileAPI";

(module.exports = config), tConfig;
