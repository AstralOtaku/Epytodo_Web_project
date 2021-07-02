const db = require('../../config/db');

const getAllTask = (r) => {
    db.query('SELECT * FROM todo', (err, result) => {
        if (err) throw err;
        r(result);
    });
};

const createNewTask = (r, task) => {
    db.query('INSERT INTO todo SET ?', task, (err, result) => {
        if (err) throw err;
        r(getTaskData(result.insertId, r));
    });
};

const getTaskData = (task_id, r) => {
    db.query("SELECT * FROM todo WHERE id=?", task_id, (err, result) => {
        if (err) throw err;
        r(result);
    });
};

const updateTaskData = (task_id, data) => {
    db.query("UPDATE todo SET ? WHERE id=?", [data, task_id], (err, result) => {
        if (err) throw err;
        r(getTaskData(result.insertId, r));
    });
}

const deleteTask = (task_id, r) => {
    db.query("DELETE FROM todo WHERE id=?", task_id, (err, result) => {
        if (err) throw err;
        r(task_id);
    });
};

const checkTask = (task_id) => {
    db.query("SELECT * FROM todo WHERE id=?", task_id, (err, result) => {
        if (err) throw err;
        if (!result.length) return false;
        return true;
    });
};

module.exports = { getAllTask, createNewTask, getTaskData, updateTaskData, deleteTask, checkTask };