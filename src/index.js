const express = require('express');
const auth = require('./routes/auth/auth');
const user = require('./routes/user/user');
const todo = require('./routes/todos/todos');
const port = process.env.PORT || 3000;

const app = express();

app.use(auth);
app.use('/user', user);
app.use('/todo', todo)

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})