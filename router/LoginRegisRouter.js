const express = require('express');
const { CreateNewUser, LoginUserName } = require("../controller/userControl.js");
const route = express.Router();

route.post('/Register', CreateNewUser);
route.post('/Login', LoginUserName);

module.exports = route;