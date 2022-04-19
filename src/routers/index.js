'use strict';
const express = require('express');
const routeRouter = express.Router();
const movieRouter = require("./movies");
const userRouter = require("./users");

routeRouter.use('/movies', movieRouter)
routeRouter.use('/user', userRouter)

module.exports = routeRouter