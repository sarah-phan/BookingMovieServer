'use strict'

const { Movie } = require("../../../models")

const validation = ( 
    name,
    alias,
    description,
    trailer,
    startShowing) => {
        var error 
        if (!name || !name.trim()){
            return error = 'Movie name is required'
        }
        if (!alias || !alias.trim()){
            return error = 'Movie alias is required'
        }
        if (!description || !description.trim()){
            return error = 'Movie description is required'
        }
        if (!trailer || !trailer.trim()){
            return error = 'Movie trailer is required'
        }
        if (!startShowing || !startShowing.trim()){
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
const getMovies = async() => {
    try {
        const movies = await Movie.findAll()
        return movies
    } catch (error) {
        return null;
    }
}
const getMovieDetail = async(id) => {
    try {
        const movie = await Movie.findOne({
            where: {
                id,
            }
        })
        return movie
    } catch (error) {
        console.log(error)
        return null
    }
}
module.exports = {
    createMovie, 
    validation,
    getMovies,
    getMovieDetail
}