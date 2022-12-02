const express = require('express');
const { postCategories } = require('./controllers/Category.controller');
const { postLogin, postUser, getAllUser, getUserById } = require('./controllers/User.controller');
const { middleLogin, middleDisplayName, middleEmail,
     middlePassword, middleToken, middleName } = require('./middlewares/verification');

const app = express();

app.use(express.json());

app.post('/login', middleLogin, postLogin);

app.post('/user', middleDisplayName, middlePassword, middleEmail, postUser);

app.get('/user', middleToken, getAllUser);

app.get('/user/:id', middleToken, getUserById);

app.post('/categories', middleToken, middleName, postCategories);

module.exports = app;
