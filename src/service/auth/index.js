'use strict'

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {AUTH} = require("../../config");

const scriptPassword = (password) => {
    const salt = bcryptjs.genSaltSync(10);
    const hashed = bcryptjs.hashSync(password, salt)
    return hashed;
}
const comparedPassword = (password, passwordHashed) => {
    const isMatch = bcryptjs.compareSync(password, passwordHashed)
    return isMatch;
}

const genToken = (data) => {
    const token = jwt.sign(data, AUTH.SECRET_KEY, {
        expiresIn: '1d'
    })
    return token;
}
const decodeToken = (token) => {
    const decode = jwt.verify(token, AUTH.SECRET_KEY);
    return decode;
}

module.exports = {
    scriptPassword,
    comparedPassword,
    genToken,
    decodeToken
}