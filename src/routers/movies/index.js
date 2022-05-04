"use strict";
const express = require("express");
const { authenticate, checkRole } = require("../../../middleware/auth");
const { uploadImage } = require("../../../middleware/upload");
const { SYSTEM } = require("../../config");
const {
    createMovie,
    validation,
    getMovies,
    getMovieDetail,
    storageMovieImage,
    getAllMoviePagination,
    getMovieByDate,
    deleteMovieById
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

movieRouter.get('/get-movie-pagination', async (req, res) => {
    const { limit, skip } = req.query;
    const moviePagination = await getAllMoviePagination(skip, limit)
    if (!moviePagination) {
        return res.status(500).send("Cannot send movie pagination")
    }
    res.status(200).send(moviePagination)
})

movieRouter.get('/get-movie-detail/:id', async (req, res) => {
    const { id } = req.params
    const movie = await getMovieDetail(id)
    if (!movie) {
        return res.status(404).send(`Cannot get movie with id ${id}`)
    }
    res.status(200).send(movie);
})

movieRouter.post('/movie-images/:id', [authenticate, checkRole('AA'), uploadImage('MovieImage')], async (req, res) => {
    const { id } = req.params
    const movie = await getMovieDetail(id)
    if (!movie) {
        return res.status(500).send(`Cannot get movie with id ${id}`)
    }
    const file = req.file
    const url = `${SYSTEM.DOMAIN}/${file.path}`;
    const movieImage = await storageMovieImage(movie.id, url)
    res.status(200).send(movieImage)
})

movieRouter.get('/get-movie-by-date', async (req, res) => {
    const { startDate, endDate } = req.query
    const movie = await getMovieByDate(startDate, endDate)
    if (!movie) {
        return res.status(500).send('Cannot get movie by date')
    }
    res.status(200).send(movie)
})

movieRouter.delete('/delete-movie-by-ID/:id', [authenticate, checkRole('AA')], async (req, res) => {
    const message = 'Deleted successfully'
    const { id } = req.params
    const isExisted = await getMovieDetail(id)
    if (!isExisted) {
        return res.status(404).send(`Cannot find movie id ${id}`)
    }
    const deleteResult = await deleteMovieById(id)
    if (!deleteResult) {
        return res.status(500).send(`Cannot delete movie id ${id}`)
    }
    res.status(200).send([
        {
            "message": message,
            "movie": isExisted

        },
    ])
})
module.exports = movieRouter