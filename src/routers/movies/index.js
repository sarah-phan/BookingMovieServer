"use strict";
const express = require("express");
const { authenticate, checkRole } = require("../../../middleware/auth");
const {
    createMovie,
    validation,
    getMovies,
    getMovieDetail
} = require("../../service/movie");
const movieRouter = express.Router()

movieRouter.post("/create-movie", [authenticate, checkRole('AA')], async (req, res) => {
    const {
        name,
        alias,
        description,
        trailer,
        startShowing,
        rating,
        hot,
        isShown,
        comingSoon,
    } = req.body
    const error = validation(
        name,
        alias,
        description,
        trailer,
        startShowing)
    if (error) {
        return res.status(406).send(error)
    }
    const movie = await createMovie({
        name,
        alias,
        description,
        trailer,
        startShowing,
        rating,
        hot,
        isShown,
        comingSoon,
    })
    if (!movie) {
        return res.status(500).send("Cannot create movie")
    }
    res.status(201).send(movie)
})

movieRouter.get('/get-all-movie', async (req, res) => {
    const movies = await getMovies()
    if (!movies) {
        return res.status(500).send("Cannot get movie")
    }
    res.status(200).send(movies)
})

movieRouter.get('/get-movie-detail/:id', async (req, res) => {
    const { id } = req.params
    const movie = await getMovieDetail(id)
    if (!movie) {
        return res.status(500).send(`Cannot get movie with id ${id}`)
    }
    res.status(200).send(movie);
})

module.exports = movieRouter