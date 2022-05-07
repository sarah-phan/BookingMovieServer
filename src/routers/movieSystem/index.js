'use strict'
const express = require('express')
const { authenticate, checkRole } = require('../../../middleware/auth')
const { uploadImage } = require('../../../middleware/upload')
const { SYSTEM } = require('../../config')
const { getAllCinemaSystem, validation, createCinemaSystem, checkCinemaSystemExist, deleteCinemaSystem, storageSystemLogo } = require('../../service/movieSystem')

const systemRouter = express.Router()

systemRouter.get('/get-cinema-system', async(req,res) => {
    const {idSystem} = req.query
    console.log(idSystem)
    const cinemaSystem = await getAllCinemaSystem(idSystem)
    if(!cinemaSystem){
        return res.status(500).send("Cannot send cinema system")
    }
    res.status(200).send(cinemaSystem)
})

systemRouter.post('/create-cinema-system', [authenticate, checkRole('AA')], async(req,res) => {
    const {
        id,
        systemName,
        alias
    } = req.body
    const error = validation(id, systemName, alias)
    if(error){
        return res.status(406).send(error)
    }
    const data = {
        id,
        systemName,
        alias
    }
    const system = await createCinemaSystem(data)
    if(!system){
        return res.status(500).send('Cannot create cinema system')
    }
    res.status(200).send(system)
})

systemRouter.delete('/delete-cinema-system/:id', [authenticate, checkRole('AA')], async(req, res) => {
    const {id} = req.params
    const isExisted = await checkCinemaSystemExist(id)
    if(!isExisted){
        return res.status(404).send(`Cannot find system id ${id}`)
    }
    const deletedResult = await deleteCinemaSystem(id)
    console.log({deletedResult})
    if(!deletedResult){
        return res.status(500).send(`Cannot delete system id ${id}`)
    }
    res.status(200).send([
        {
            'message': 'Deleted successfully',
            'Cinema System': isExisted
        }
    ])
})

systemRouter.post('/cinema-system-logo/:id', [authenticate, checkRole('AA'), uploadImage('SystemLogo')], async(req,res) => {
    const {id} = req.params
    const file = req.file
    const isExisted = await checkCinemaSystemExist(id)
    if (!isExisted){
        return res.status(404).send(`Cannot find system id ${id}`)
    }
    const url = `${SYSTEM.DOMAIN}/${file.path}`
    const logo = await storageSystemLogo(id, url)
    res.status(200).send(logo)
})
module.exports = systemRouter