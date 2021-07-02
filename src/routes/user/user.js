const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const notFound = require('../../middleware/notFound');
const { getAllUser, getUserTodos, getUserData, updateUserData, deleteUser } = require('./user.query')

router.use(express.urlencoded({extended: false}));
router.use(express.json());
router.use('/', auth);

router.get('/', (req, res) => {
    getAllUser(r => {
        return res.send(200).json(r);
    });
});

router.get('/todos', (req, res) => {
    let user = jwt.decode(req.headers.authorization.split(' ')[1]);
    getUserTodos(user.user_id, r => {
        return res.send(200).json(r);
    })
})

router.use(notFound);

router.get('/:id', (req, res) => {
    getUserData(req.params, r => {
        return res.send(200).json(r);
    });
})

router.put('/:id', (req, res) => {
    updateUserData(req.params.id, req.body, r => {
        return res.send(200).json(r);
    })
})

router.delete('/:id', (req, res) => {
    deleteUser(req.params.id, (del) => res.status(200).json({msg: `succesfully deleted record number: ${del}`}));
})

module.exports = router;