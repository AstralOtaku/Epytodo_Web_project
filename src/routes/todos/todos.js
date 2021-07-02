const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const notFoundTask = require('../../middleware/notfoundTask');
const { getAllTask, createNewTask, getTaskData, updateTaskData, deleteTask } = require('./todos.query');

router.use(express.urlencoded({extended: false}));
router.use(express.json());

router.use('/', auth);

router.get('/', (req, res) => {
    getAllTask(r => {
        return res.send(200).json(r);
    });
});

router.post('/', (req, res) => {
    createNewTask(req.body, r => {
        return res.send(201).json(r);
    });
});

router.use(notFoundTask)

router.get('/:id', (req, res) => {
    getTaskData(req.params, r => {
        return res.send(200).json(r);
    });
})

router.put('/:id', (req, res) => {
    updateTaskData(req.params.id, req.body, r => {
        return res.send(200).json(r);
    })
})

router.delete('/:id', (req, res) => {
    deleteTask(req.params.id, (del) => res.status(200).json({msg: `succesfully deleted record number: ${del}`}));
})

module.exports = router;