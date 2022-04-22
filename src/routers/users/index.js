'use strict'

const express = require('express');
const { scriptPassword } = require('../../service/auth');
const { 
    getAllUser, 
    getUserById, 
    getAllRoles, 
    getAllUserPagination, 
    createUser
} = require('../../service/user');
const userRouter = express.Router();

userRouter.get('/get-all-role', async (req, res) => {
    const role = await getAllRoles()
    if (!role){
        return res.status(500).send("Cannot get role");
    }
    res.status(200).send(role);
})
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
userRouter.get('/get-all-user-pagination', async(req, res) => {
    const {skip, limit}  = req.query;
    const userPagination = await getAllUserPagination(skip, limit)
    if(!userPagination){
        return res.status(500).send("Cannot send data user pagination")
    }
    res.status(200).send(userPagination)
})

userRouter.post("/sign-up", async(req, res) => {
    const {
        username, 
        password, 
        fullName, 
        birthday, 
        gender, 
        phone, 
        address, 
    } = req.body;
    const passwordHashed = scriptPassword(password);
    const data = await createUser({
        username, 
        password: passwordHashed, 
        fullName, 
        birthday, 
        gender, 
        phone, 
        address,
        roleId: 'AU'
    });
    if(!data){
        return res.status(500).send("Cannot create user")
    }
    res.status(201).send(data)
})

module.exports = userRouter