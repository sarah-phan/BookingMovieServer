'use strict'

const { CinemaSystem, Cinema, ShowtimeSchedule, CinemaRoom, Movie, ListSeat } = require('../../../models')

const createShowtime = async (data) => {
    const { price, roomId } = data
    const priceVip = parseInt(price) + 20000
    try {
        const showtime = await ShowtimeSchedule.create(data)
        for (let i = 1; i <= 10; i++) {
            if (i >= 1 && i <= 7) {
                await ListSeat.create({
                    seatName: i,
                    seatType: "Normal",
                    orderNumber: i,
                    price: price,
                    isBooked: false,
                    roomId,
                    userId: null,
                    showtimeId: showtime.dataValues.id
                })
            }
            if (i > 7 && i <= 10) {
                await ListSeat.create({
                    seatName: i,
                    seatType: "VIP",
                    orderNumber: i,
                    price: priceVip,
                    isBooked: false,
                    roomId,
                    userId: null,
                    showtimeId: showtime.dataValues.id
                })
            }
        }
        return showtime
    } catch (error) {
        console.log({ error })
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
            attributes: ['id', 'systemName', 'alias'],
            include: {
                model: Cinema,
                as: 'cinemas',
                attributes: ['id', 'cinemaName', 'address', 'alias', 'systemId'],
                include: {
                    model: CinemaRoom,
                    as: 'rooms',
                    required: true,
                    attributes: ['id', 'roomName', 'cinemaId'],
                    include: {
                        model: ShowtimeSchedule,
                        as: 'showtimes',
                        required: true,
                        attributes: ['id', 'timeshow', 'price', 'duration', 'roomId', 'movieId'],
                        include: {
                            model: Movie,
                            as: 'movie',
                            attributes: ['id', 'name', 'alias', 'description', 'trailer', 'startShowing', 'rating', 'hot', 'isShown', 'comingSoon']
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

const checkShowtimeExisted = async (id) => {
    try {
        const showtime = await ShowtimeSchedule.findOne({
            where: {
                id,
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
    getShowtimeBySystem,
    checkShowtimeExisted
}