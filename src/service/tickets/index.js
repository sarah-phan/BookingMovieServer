'use strict'

const { Ticket, ShowtimeSchedule, Movie, ListSeat, CinemaRoom, User } = require('../../../models')

const listSeatByShowtime = async(id) => {
    try {
        const seats = ListSeat.findAll({
            where: {
                showtimeId: id
            }
        })
        return seats
    } catch (error) {
        return null
    }
}

const getTicketList = async (id) => {
    try {
        const ticketList = await Ticket.findAll({
            where: {
                showtimeId: id,
            },
            attributes: ['id'],
            include: [
                {
                    model: ShowtimeSchedule,
                    as: 'showtime',
                    attributes: ['id', 'timeShow', 'price', 'duration']
                },
                {
                    model: Movie,
                    as: 'movie',
                    attributes: ['id', 'name', 'description', 'trailer', 'startShowing', 'rating', 'hot', 'isShown', 'comingSoon']
                },
                {
                    model: CinemaRoom,
                    as: 'rooms',
                    attributes: ['id', 'roomName', 'cinemaId'],
                    include: {
                        model: ListSeat,
                        as: 'seats',
                        attributes: ['id', 'seatName', 'seatType', 'orderNumber', 'price', 'isBooked'],
                        where: {
                            showtimeId: id
                        },
                        include: {
                            model: User,
                            as: 'account',
                            attributes: ['id', 'username', 'password', 'fullName', 'birthday', 'gender', 'phone', 'address']
                        }
                    }
                }
            ],
        })
        return ticketList
    } catch (error) {
        console.log({ error })
        return null
    }
}

const getTicketByUser = async (id) => {
    try {
        const ticket = await Ticket.findAll({
            where: {
                userId: id
            },
            attributes: ['id'],
            include: [
                {
                    model: ShowtimeSchedule,
                    as: 'showtime',
                    attributes: ['id', 'timeShow', 'price', 'duration']
                },
                {
                    model: Movie,
                    as: 'movie',
                    attributes: ['id', 'name', 'description', 'trailer', 'startShowing', 'rating', 'hot', 'isShown', 'comingSoon']
                },
                {
                    model: ListSeat,
                    as: 'seat',
                    attributes: ['id', 'seatName', 'price', 'roomId']
                }
            ]
        })
        return ticket
    } catch (error) {
        return null
    }
}

const createTicket = async (data) => {
    const { seatId, userId } = data
    try {
        const ticket = await Ticket.create(data)
        const updateSeatStatus = await ListSeat.update(
            {
                isBooked: true,
                userId,
            },
            {
                where: {
                    id: seatId
                }
            }
        )
        if(!updateSeatStatus || !ticket){
            return null
        }
        return ticket
    } catch (error) {
        console.log(error)
        return null
    }
}
module.exports = {
    getTicketList,
    getTicketByUser,
    createTicket,
    listSeatByShowtime
}