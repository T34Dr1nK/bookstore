const express = require('express');
const { testSys } = require("../controller/control.js");
const route = express.Router();

route.get('/', testSys);

module.exports = route;