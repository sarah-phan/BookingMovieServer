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

const port = process.env.port || 3000
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})