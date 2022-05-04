'use strict'
const express = require('express')
const { authenticate, checkRole } = require('../../../middleware/auth')
const { uploadImage } = require('../../../middleware/upload')
const { SYSTEM } = require('../../config')
const { getAllCinemaSystem } = require('../../service/movieSystem')

const systemRouter = express.Router()

systemRouter.get('/get-cinema-system', async(req,res) => {
    const cinemaSystem = await getAllCinemaSystem()
    if(!cinemaSystem){
        return res.status(500).send("Cannot send cinema system")
    }
    res.status(200).send(cinemaSystem)
})

module.exports = systemRouter