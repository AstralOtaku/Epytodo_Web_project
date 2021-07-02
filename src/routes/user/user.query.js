const db = require('../../config/db');

const getAllUser = (r) => {
    db.query('SELECT * FROM user', (err, result) => {
        if (err) throw err;
        r(result);
    });
};

const getUserTodos = (user_id, r) => {
    db.query('SELECT * FROM todo WHERE user_id=?', user_id, (err, result) => {
        if (err) throw err;
        r(result);
    });
};

const getUserData = (params, r) => {
    if (params.id) {
        db.query('SELECT * FROM todo WHERE user_id=?', params.id, (err, result) => {
            if (err) throw err;
            r(result);
        });
    } else if (params.email) {
        db.query('SELECT * FROM todo WHERE email=?', params.email, (err, result) => {
            if (err) throw err;
            r(result);
        });
    };
};

const updateUserData = (user_id, data, r) => {
    db.query("UPDATE user SET ? WHERE id=?", [data, user_id], (err, result) => {
        if (err) throw err;
        getUserData(user_id, r);
    });
};

const deleteUser = (user_id, r) => {
    db.query("DELETE FROM user WHERE id=?", user_id, (err, result) => {
        if (err) throw err;
        r(user_id);
    });
};

const checkUser = (user_id) => {
    db.query("SELECT * FROM user WHERE id=?", user_id, (err, result) => {
        if (err) throw err;
        if (!result.length) return false;
        return true;
    });
};

module.exports = { getAllUser, getUserTodos, getUserData, updateUserData, deleteUser, checkUser };