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
const getPagination = (skipFromUser, limitFromUser) => {
    const limit = limitFromUser ? +limitFromUser : 3
    const offset = skipFromUser ? skipFromUser*limit : 0
    return {offset, limit}
}
const getAllUserPagination = async(skipFromUser, limitFromUser) => {
    try {
        const {offset, limit} = getPagination(skipFromUser, limitFromUser);
        const userPagination = await User.findAll({
            limit,
            offset,
        })
        return userPagination
    } catch (error) {
        console.log(error)
        return null
    }
}

const createUser = async(data) => {
    try {
        const user = await User.create(data)
        return user
    } catch (error) {
        console.log(error)
        return null
    }
}
const getUserByUsername = async(username) => {
    try {
        const data = await User.findOne({
            where: {
                username,
            }
        })
        return data
    } catch (error) {
        console.log(error)
        return null;
    }
}
module.exports = {
    getAllRoles,
    getAllUser,
    getUserById,
    getAllUserPagination,
    createUser,
    getUserByUsername
}