const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../config/db');
require('dotenv').config();

const app = express();

app.post('/register', (req, res) => {
    db.query("SELECT * FROM user WHERE email=?", req.body.email, (err, result) => {
        if (err) throw err;
        if (result.length) return res.status(409).json({msg: "account already exists"});
        req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync());
        db.query('INSERT INTO user SET ?', req.body, (err, result) => {
            if (err) throw err;
            res.status(201).json({token: jwt.sign({user_id: result.insertId, user_email: req.body.email}, process.env.SECRET)})
        })
    })
});

app.post('/login', (req, res) => {
    db.query("SELECT * FROM user WHERE email=?", req.body.email, (err, result) => {
        if (err) throw err;
        if (!result.length || !bcrypt.compareSync(req.body.password, result[0].password)) return res.status(401).json({msg: "Invalid Credentials"});
        res.status(200).json({token: jwt.sign({user_id: result[0].insertId, user_email: req.body.email}, process.env.SECRET)});
    })
});

module.exports = app;