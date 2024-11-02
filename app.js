//require and Import
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

//set app to use express()
app = express();

//call cors and bodyparser to work with express
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log('Request URL:', req.originalUrl)
    console.log('Request Type:', req.method);
    console.log('Time:', Date.now());
    next();
 })

//---------start router section -----------
const routes = require("./router/routes.js");
//---------End router section -------------

app.use("/", routes);

//for routering err
app.use(function (req, res) {
    res.status(404).json({ message: "No such route exists" });
  });
  
app.use(function (err, req, res, next) {
    res.status(err.status || 500).json({ message: "Error Message" });
});

module.exports = app;