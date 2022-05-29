'use strict';
const express = require("express");
const routeRouter = require('./src/routers')
const { sequelize } = require("./models")
const path = require('path');

const app = express()
app.use(express.json())
app.use('/api', routeRouter)
app.use('/public', express.static(path.join(__dirname, 'public')));

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})