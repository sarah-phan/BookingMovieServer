'use strict'

const express = require('express');
const { getAllUser, getUserById } = require('../../service/user');
const userRouter = express.Router();

userRouter.get('/get-all-user', async (req, res) => {
    const users = await getAllUser()
    if (users === null) {
        return res.status(500).send("Cannot get user list");
    }
    res.status(200).send(users)
})
userRouter.get('/user-detail/:id', async (req, res) => {
    const { id } = req.params;
    const user = await getUserById(id)
    if (!user){
        return res.status(500).send(`Cannot get detail of user ${id}`)
    }
    res.status(200).send(user)
})
module.exports = userRouter