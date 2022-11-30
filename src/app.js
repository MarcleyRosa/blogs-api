const express = require('express');
const { postLogin, postUser } = require('./controllers/User.controller');
const { middleName } = require('./middlewares/verification');

const app = express();

app.use(express.json());

app.post('/login', middleName, postLogin);

app.post('/user', postUser);

module.exports = app;
