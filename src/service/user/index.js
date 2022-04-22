'use strict'

const { User } = require("../../../models")
const { UserRole } = require("../../../models")

const getAllRoles = async () => {
    try {
        const role = await UserRole.findAll()
        return role;
    } catch (error) {
        console.log(error)
        return null;
    }
}
const getAllUser = async () => {
    try {
        const users = await User.findAll()
        return users;
    } catch (error) {
        return null
    }
}
const getUserById = async (id) => {
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
    getAllRoles,
    getAllUser,
    getUserById
}