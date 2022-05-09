'use strict'
const express = require('express')
const { authenticate, checkRole } = require('../../../middleware/auth')
const {
    createCinema,
    getCinemaBySystem,
    checkCinemaExisted,
    createListRoom,
    getRoomByCinema
} = require('../../service/cinema')
const { checkCinemaSystemExist } = require('../../service/movieSystem')
const cinemaRouter = express.Router()

cinemaRouter.post('/create-cinema', [authenticate, checkRole('AA')], async (req, res) => {
    const { id, cinemaName, address, alias, systemId } = req.body
    const checkSystemId = await checkCinemaSystemExist(systemId)
    if (!checkSystemId) {
        return res.status(404).send(`Cannot find cinema system id ${systemId}`)
    }
    const data = { id, cinemaName, address, alias, systemId }
    const cinema = await createCinema(data)
    if (!cinema) {
        return res.status(500).send("Cannot create cinema")
    }
    res.status(201).send(cinema)
})

cinemaRouter.get('/get-cinema-by-system/:idSystem', async (req, res) => {
    const { idSystem } = req.params
    const checkSystemId = await checkCinemaSystemExist(idSystem)
    if (!checkSystemId) {
        return res.status(404).send(`Cannot find cinema system id ${idSystem}`)
    }
    const cinema = await getCinemaBySystem(idSystem)
    if (!cinema) {
        return res.status(500).send('Cannot get cinema list')
    }
    res.status(200).send(cinema)
})

cinemaRouter.post('/create-room/:idCinema', [authenticate, checkRole('AA')], async (req, res) => {
    const {idCinema} = req.params
    const {id, roomName} = req.body

    const checkCinemaId = await checkCinemaExisted(idCinema)
    if (!checkCinemaId) {
        return res.status(404).send(`Cannot find cinema system id ${idCinema}`)
    }
    
    const room = await createListRoom(id, roomName, idCinema)
    if(!room){
        return res.status(500).send("Cannot create room")
    }
    res.status(201).send(room)
})

cinemaRouter.get('/get-room-by-cinema/:idCinema', async(req,res) => {
    const {idCinema} = req.params

    const checkCinemaId = await checkCinemaExisted(idCinema)
    if (!checkCinemaId) {
        return res.status(404).send(`Cannot find cinema system id ${idCinema}`)
    }
    const room = await getRoomByCinema(idCinema)
    if(!room){
        return res.status(500).send("Cannot get room list")
    }
    res.status(200).send(room)
})

module.exports = cinemaRouter