'use strict'
const express = require('express')
const { authenticate, checkRole } = require('../../../middleware/auth')
const { checkRoomExisted } = require('../../service/cinema')
const { getMovieDetail } = require('../../service/movie')
const { checkCinemaSystemExist } = require('../../service/movieSystem')
const { createShowtime, getShowtimeByMovie, getShowtimeBySystem } = require('../../service/ShowtimeSchedule')
const showtimeRouter = express.Router()

showtimeRouter.post('/create-showtime', [authenticate, checkRole('AA')], async (req, res) => {
    const {
        timeShow,
        price,
        duration,
        roomId,
        movieId
    } = req.body
    const isRoomExisted = await checkRoomExisted(roomId)
    if (!isRoomExisted) {
        return res.status(404).send(`Cannot find room with id ${roomId}`)
    }
    const isMovieExisted = await getMovieDetail(movieId)
    if (!isMovieExisted) {
        return res.status(404).send(`Cannot find movie with id ${movieId}`)
    }
    const data = {
        timeShow,
        price,
        duration,
        roomId,
        movieId
    }
    const showtime = await createShowtime(data)
    if (!showtime) {
        return res.status(500).send('Cannot create showtime')
    }
    res.status(201).send(showtime)
})

showtimeRouter.get('/get-showtime-by-movie/:idMovie', async (req, res) => {
    const { idMovie } = req.params
    const isMovieExisted = await getMovieDetail(idMovie)
    if (!isMovieExisted) {
        return res.status(404).send(`Cannot find movie with id ${movieId}`)
    }
    const showtime = await getShowtimeByMovie(idMovie)
    if (!showtime) {
        return res.status(500).send(`Cannot get showtime of movie with id ${idMovie}`)
    }
    res.status(200).send(showtime)
})

showtimeRouter.get('/get-showtime-by-system/:idSystem', async (req, res) => {
    const { idSystem } = req.params
    const isSystemExisted = await checkCinemaSystemExist(idSystem)
    if(!isSystemExisted){
        return res.status(404).send(`Cannot find cinema system with id ${idSystem}`)
    }
    const showtime = await getShowtimeBySystem(idSystem)
    if(!showtime){
        return res.status(500).send("Cannot get showtime by cinema system")
    }
    res.status(200).send(showtime)
})
module.exports = showtimeRouter