'use strict'

const {User} = require("../../../models")

const getAllUser = async() => {
    try {
        const users = await User.findAll()
        return users;
    } catch (error) {
        return null
    }
}
const getUserById = async(id) => {
    try {
        const user = await User.findOne({
            where: {
                id,
            }
        })
        return user
    } catch (error) {
        return null;
    }
}

module.exports = {
    getAllUser,
    getUserById
}