const { Op } = require('sequelize')
const { CinemaSystem, CinemaLogo } = require('../../../models')

const validation = (id, systemName, alias) => {
    let error
    if (!id || !id.trim()) {
        error = 'ID is required'
    }
    if (!systemName || !systemName.trim()) {
        error = 'System name is required'
    }
    if (!alias || !alias.trim()) {
        error = 'Alias is required'
    }
    return error
}

const getAllCinemaSystem = async (idSystem) => {
    try {
        const options = {
            where: {},
            include: {
                model: CinemaLogo,
                as: 'Logo',
                required: false,
                where: {
                    isActive: true
                }
            }
        }
        if (idSystem !== undefined){
            options.where.id = idSystem
        }
        const cinemaSystem = await CinemaSystem.findAll(options)
        return cinemaSystem
    } catch (error) {
        console.log(error)
        return null
    }
}

const createCinemaSystem = async (data) => {
    try {
        const system = await CinemaSystem.create(data)
        return system
    } catch (error) {
        console.log(error)
        return null
    }
}

const checkCinemaSystemExist = async (id) => {
    try {
        const system = await CinemaSystem.findOne({
            where: {
                id,
            }
        })
        return system
    } catch (error) {
        return null
    }
}

const deleteCinemaSystem = async (id) => {
    try {
        const result = await CinemaSystem.destroy({
            where: {
                id,
            }
        })
        return result
    } catch (error) {
        return null
    }
}

const storageSystemLogo = async (systemId, url) => {
    try {
        const logo = await CinemaLogo.create({
            systemId,
            url,
            isActive: true
        })
        await CinemaLogo.update(
            { isActive: false },
            {
                where: {
                    systemId,
                    id: {
                        [Op.not]: logo.id
                    }
                }
            }
        )
        return logo
    } catch (error) {
        return null
    }
}
module.exports = {
    validation,
    getAllCinemaSystem,
    createCinemaSystem,
    checkCinemaSystemExist,
    deleteCinemaSystem,
    storageSystemLogo
}