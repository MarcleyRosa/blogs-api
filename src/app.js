const express = require('express');
const { postLogin, postUser, getAllUser, getUserById } = require('./controllers/User.controller');
const { middleName, middleDisplayName, middleEmail,
     middlePassword, middleToken } = require('./middlewares/verification');

const app = express();

app.use(express.json());

app.post('/login', middleName, postLogin);

app.post('/user', middleDisplayName, middlePassword, middleEmail, postUser);

app.get('/user', middleToken, getAllUser);

app.get('/user/:id', middleToken, getUserById);

module.exports = app;
