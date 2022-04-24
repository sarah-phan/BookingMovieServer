'use strict'

const express = require('express');
const { authenticate, checkRole } = require('../../../middleware/auth');
const { scriptPassword, comparedPassword, genToken } = require('../../service/auth');
const {
    getAllUser,
    getUserById,
    getAllRoles,
    getAllUserPagination,
    createUser,
    getUserByUsername,
    updateUserById,
    validation,
    deleteUser
} = require('../../service/user');
const userRouter = express.Router();

userRouter.get('/get-all-role', [authenticate], async (req, res) => {
    const role = await getAllRoles()
    if (!role) {
        return res.status(500).send("Cannot get role");
    }
    res.status(200).send(role);
})
userRouter.get('/get-all-user', [authenticate], async (req, res) => {
    const users = await getAllUser()
    if (users === null) {
        return res.status(500).send("Cannot get user list");
    }
    res.status(200).send(users)
})
userRouter.get('/user-detail/:id', [authenticate], async (req, res) => {
    const { id } = req.params;
    const user = await getUserById(id)
    if (!user) {
        return res.status(500).send(`Cannot get detail of user ${id}`)
    }
    res.status(200).send(user)
})
userRouter.get('/get-all-user-pagination', [authenticate], async (req, res) => {
    const { skip, limit } = req.query;
    const userPagination = await getAllUserPagination(skip, limit)
    if (!userPagination) {
        return res.status(500).send("Cannot send data user pagination")
    }
    res.status(200).send(userPagination)
})

userRouter.post("/sign-up", async (req, res) => {
    const {
        username,
        password,
        fullName,
        birthday,
        gender,
        phone,
        address,
    } = req.body;

    const error = validation(username, password, fullName, birthday, gender, phone, address);
    if(error){
        return res.status(406).send(error)
    }

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
    if (!data) {
        return res.status(500).send("Cannot create user")
    }
    res.status(201).send(data)
})
userRouter.post('/sign-in', async (req, res) => {
    const { username, password } = req.body;
    const user = await getUserByUsername(username)
    if (!user) {
        return res.status(401).send("Username is not existed")
    }
    const isSuccess = comparedPassword(password, user.password);
    if (!isSuccess) {
        return res.status(401).send("Password is not match")
    }
    const token = genToken({
        id: user.id
    })
    res.status(200).send({ user, token })
})
userRouter.put('/update-user/:id', [authenticate], async(req, res) => {
    const message = "Updated successfully";
    const{
        username,
        password,
        fullName,
        birthday,
        gender,
        phone,
        address,
    } = req.body;
    const {id} = req.params

    const isExistUser = await getUserById(id);
    if(!isExistUser){
        return res.status(404).send("Not exist user account")
    }
    const data = {
        username,
        password,
        fullName,
        birthday,
        gender,
        phone,
        address,
    };
    const user = await updateUserById(id, data);
    if (!user){
        return res.status(500).send("Cannot update user information");
    }
    const fetchUser = await getUserById(id);
    res.status(200).send({message, fetchUser});
})

userRouter.delete('/delete-user/:id', [authenticate, checkRole('AA')], async(req,res) => {
    const message = "Delete successfully"
    const {id} = req.params
    const isExistUser = await getUserById(id);
    if(!isExistUser){
        return res.status(404).send("Not exist user account")
    }
    const user = await deleteUser(id)
    if(!user){
        return res.status(500).send("Cannot delete user")
    }
    res.status(200).send({message, isExistUser});
})

module.exports = userRouter