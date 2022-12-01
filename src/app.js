const express = require('express');
const { postLogin, postUser } = require('./controllers/User.controller');
const { middleName, middleDisplayName, middleEmail,
     middlePassword } = require('./middlewares/verification');

const app = express();

app.use(express.json());

app.post('/login', middleName, postLogin);

app.post('/user', middleDisplayName, middlePassword, middleEmail, postUser);

module.exports = app;
