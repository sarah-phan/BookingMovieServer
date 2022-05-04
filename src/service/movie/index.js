'use strict'

const { Op } = require("sequelize")
const { Movie, MovieImages, sequelize } = require("../../../models")

const validation = (
    name,
    alias,
    description,
    trailer,
    startShowing) => {
    var error
    if (!name || !name.trim()) {
        return error = 'Movie name is required'
    }
    if (!alias || !alias.trim()) {
        return error = 'Movie alias is required'
    }
    if (!description || !description.trim()) {
        return error = 'Movie description is required'
    }
    if (!trailer || !trailer.trim()) {
        return error = 'Movie trailer is required'
    }
    if (!startShowing || !startShowing.trim()) {
        return error = 'Movie start showing day is required'
    }
    return null
}

const createMovie = async (data) => {
    try {
        const movie = await Movie.create(data)
        return movie
    } catch (error) {
        console.log(error)
        return null
    }
}

const getMovies = async () => {
    try {
        const movies = await Movie.findAll()
        return movies
    } catch (error) {
        return null;
    }
}

const getPagination = (skipFromUser, limitFromUser) => {
    const limit = limitFromUser ? +limitFromUser : 3;
    const offset = skipFromUser ? skipFromUser * limit : 0;
    return { offset, limit }
}

const getAllMoviePagination = async (skipFromUser, limitFromUser) => {
    try {
        const { offset, limit } = getPagination(skipFromUser, limitFromUser)
        const moviePagination = await Movie.findAll({
            limit,
            offset,
        })
        return moviePagination
    } catch (error) {
        return null
    }
}

const getMovieDetail = async (id) => {
    try {
        const movie = await Movie.findOne({
            where: {
                id,
            },
            include: [
                {
                    model: MovieImages,
                    required: false,
                    as: 'Image',
                    where: {
                        isActive: true
                    }
                }
            ]
        })
        return movie
    } catch (error) {
        console.log(error)
        return null
    }
}

const storageMovieImage = async (movieId, url) => {
    try {
        const movieImage = await MovieImages.create({
            url,
            movieId,
            isActive: true
        })
        await MovieImages.update(
            { isActive: false },
            {
                where: {
                    movieId,
                    id: {
                        [Op.not]: movieImage.id
                    }
                }
            }
        )
        return movieImage
    } catch (error) {
        return null
    }
}

const getMovieByDate = async (startDate, endDate) => {
    try {
        const movie = await Movie.findAll({
            where: {
                startShowing:{
                    [Op.between]: [`${startDate}`, `${endDate}`]
                }
            }
        })
        return movie
    } catch (error) {
        console.log(error)
        return null
    }
}

const deleteMovieById = async (id) => {
    try {
        const result = await Movie.destroy({
            where: {
                id,
            }
        })
        return result
    } catch (error) {
        return null
    }
}

const updateMovie = async(id, data) => {
    try {
        const result = await Movie.update(data, {
            where: {
                id,
            }
        })
        return result
    } catch (error) {
        return null
    }
}
module.exports = {
    createMovie,
    validation,
    getMovies,
    getAllMoviePagination,
    getMovieDetail,
    storageMovieImage,
    getMovieByDate,
    deleteMovieById,
    updateMovie
}