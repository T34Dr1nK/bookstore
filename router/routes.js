const express = require('express');
const { testSys, ReadSql, insertNewBook } = require("../controller/control.js");
const route = express.Router();

route.get('/', testSys);
route.get('/ReadSQL', ReadSql);
route.post('/NewBook', insertNewBook);

module.exports = route;