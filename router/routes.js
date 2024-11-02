const express = require('express');
const { testSys, ReadSql } = require("../controller/control.js");
const route = express.Router();

route.get('/', testSys);
route.get('/ReadBook', ReadSql);

module.exports = route;