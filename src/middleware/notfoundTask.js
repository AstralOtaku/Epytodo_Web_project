const express = require('express');
require('dotenv').config();
const { checkTask } = require('../routes/todos/todos.query');

const app = express();

app.use((req, res, next) => {
    if (!req.params.id) next();
    if (checkTask(req.params.id)) next();
    return res.status(404).json({msg: "Not found"});
})

module.exports = app;