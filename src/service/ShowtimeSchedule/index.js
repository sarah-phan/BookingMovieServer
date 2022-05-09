'use strict'

const { CinemaSystem, Cinema, ShowtimeSchedule, CinemaRoom, Movie } = require('../../../models')

const createShowtime = async (data) => {
    try {
        const showtime = await ShowtimeSchedule.create(data)
        return showtime
    } catch (error) {
        return null
    }
}

const getShowtimeByMovie = async (id) => {
    try {
        const showtime = await CinemaSystem.findAll({
            attributes: ['id', 'systemName', 'alias'],
            include: {
                model: Cinema,
                as: 'cinemas',
                required: true,
                attributes: ['id', 'cinemaName', 'address', 'alias', 'systemId'],
                include: {
                    model: CinemaRoom,
                    as: 'rooms',
                    required: true,
                    attributes: ['id', 'roomName', 'cinemaId'],
                    include: {
                        model: ShowtimeSchedule,
                        as: 'showtimes',
                        where: {
                            movieId: id
                        },
                        attributes: ['id', 'timeshow', 'price', 'duration', 'roomId', 'movieId']
                    }
                }
            }
        })
        return showtime
    } catch (error) {
        return null
    }
}

const getShowtimeBySystem = async (id) => {
    try {
        const showtime = await CinemaSystem.findAll({
            where: {
                id,
            },
            include: {
                model: Cinema,
                as: 'cinemas',
                include: {
                    model: CinemaRoom,
                    as: 'rooms',
                    required: true,
                    include: {
                        model: ShowtimeSchedule,
                        as: 'showtimes',
                        required: true,
                        include: {
                            model: Movie,
                            as: 'movie'
                        }
                    }
                }

            }
        })
        return showtime
    } catch (error) {
        console.log(error)
        return null
    }
}
module.exports = {
    createShowtime,
    getShowtimeByMovie,
    getShowtimeBySystem
}