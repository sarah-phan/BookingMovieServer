'use strict'
const {Cinema, CinemaRoom} = require('../../../models')

const createCinema = async(data) => {
    try {
        const cinema = await Cinema.create(data)
        return cinema
    } catch (error) {
        return null
    }
}

const getCinemaBySystem = async(id) => {
    try {
        const cinema = await Cinema.findAll({
            where:{
                systemId: id
            }
        })
        return cinema
    } catch (error) {
        console.log(error)
        return null
    }
}

const checkCinemaExisted = async(id) => {
    try {
        const cinema = await Cinema.findOne({
            where: {
                id,
            }
        })
        return cinema
    } catch (error) {
        return null
    }
}

const createListRoom = async(id, roomName, idCinema) => {
    try {
        const room = await CinemaRoom.create({
            id,
            roomName,
            cinemaId: idCinema
        })
        return room
    } catch (error) {
        return null
    }
}
module.exports = {
    createCinema,
    getCinemaBySystem,
    checkCinemaExisted,
    createListRoom
}