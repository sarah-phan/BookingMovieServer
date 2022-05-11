'use strict'
const express = require('express')
const { authenticate } = require('../../../middleware/auth')
const { checkShowtimeExisted } = require('../../service/ShowtimeSchedule')
const { getTicketList, getTicketByUser, createTicket, listSeatByShowtime } = require('../../service/tickets')
const { getUserById } = require('../../service/user')
const ticketRouter = express.Router()

ticketRouter.get('/get-ticket-list/:idShowtime', async(req,res) => {
    const {idShowtime} = req.params
    const isShowtimeExisted = await checkShowtimeExisted(idShowtime)
    if(!isShowtimeExisted){
        return res.status(404).send(`Cannot find showtime with id ${idShowtime}`)
    }
    const ticketList = await getTicketList(idShowtime)
    if(!ticketList){
        return res.status(500).send("Cannot get ticket list")
    }
    res.status(200).send(ticketList)
})

ticketRouter.get('/get-ticket-by-user/:id', [authenticate], async(req,res) => {
    const {id} = req.params
    const isUserExited = await getUserById(id)
    if(!isUserExited){
        return res.status(404).send(`Cannot find user with id ${id}`)
    }
    const ticket = await getTicketByUser(id)
    if(!ticket){
        return res.status(500).send("Cannot get ticket by user")
    }
    res.status(200).send(ticket)
})

ticketRouter.post('/create-ticket', [authenticate], async(req,res) => {
    const {showtimeId, seatId, userId} = req.body
    const getShowtimeDetail = await checkShowtimeExisted(showtimeId)
    if(!getShowtimeDetail){
        return res.status(404).send(`Cannot find showtime with id ${showtimeId}`)
    }
    const movieId = getShowtimeDetail.dataValues.movieId
    const cinemaRoomId = getShowtimeDetail.dataValues.roomId
    const data = {movieId, showtimeId, cinemaRoomId, seatId, userId}
    const ticket = await createTicket(data)
    if(!ticket){
        return res.status(500).send("Cannot create ticket")
    }
    res.status(201).send(ticket)
})

ticketRouter.get('/get-seats/:idShowtime', async(req,res) => {
    const {idShowtime} = req.params;
    const isShowtimeExisted = await checkShowtimeExisted(idShowtime)
    if(!isShowtimeExisted){
        return res.status(500).send("Cannot get ticket list")
    }
    const seats = await listSeatByShowtime(idShowtime)
    if(!seats){
        return res.status(500).send("Cannot get seat list")
    }
    res.status(200).send(seats)
})
module.exports = ticketRouter