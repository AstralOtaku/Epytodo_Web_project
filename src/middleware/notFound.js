const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { checkUser } = require('../routes/user/user.query');

const app = express();

app.use((req, res, next) => {
    if (!req.params.id) next();
    if (checkUser(req.params.id)) next();
    return res.status(404).json({msg: "Not found"});
})

module.exports = app;