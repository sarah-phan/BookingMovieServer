'use strict';
const express = require('express');
const cinemaRouter = require('./cinema');
const routeRouter = express.Router();
const movieRouter = require("./movies");
const systemRouter = require('./movieSystem');
const userRouter = require("./users");

routeRouter.use('/movie', movieRouter)
routeRouter.use('/user', userRouter)
routeRouter.use('/system', systemRouter)
routeRouter.use('/cinema', cinemaRouter)

module.exports = routeRouter