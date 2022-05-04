const {CinemaSystem}= require('../../../models')

const getAllCinemaSystem = async() => {
    try {
        const cinemaSystem = await CinemaSystem.findAll()
        return cinemaSystem
    } catch (error) {
        return null
    }
}

module.exports = {
    getAllCinemaSystem
}