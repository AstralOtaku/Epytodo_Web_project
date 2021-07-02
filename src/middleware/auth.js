const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

app.use((req, res, next) => {
    let authHeader = req.headers.authorization;
    if (authHeader === undefined) return res.status(401).json({msg: "No token, authorization denied"})
    let token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.SECRET, (e, pass) => {
        if (pass === undefined) return res.status(403).json({msg: "Token is not valid"});
        next();
    })
})

module.exports = app;