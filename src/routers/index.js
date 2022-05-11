'use strict';
const express = require('express');
const cinemaRouter = require('./cinema');
const routeRouter = express.Router();
const movieRouter = require("./movies");
const systemRouter = require('./movieSystem');
const showtimeRouter = require('./ShowtimeSchedule');
const ticketRouter = require('./tickets');
const userRouter = require("./users");

routeRouter.use('/movie', movieRouter)
routeRouter.use('/user', userRouter)
routeRouter.use('/system', systemRouter)
routeRouter.use('/cinema', cinemaRouter)
routeRouter.use('/showtime', showtimeRouter)
routeRouter.use('/ticket', ticketRouter)

module.exports = routeRouter