const express = require('express');

const { postLogin } = require('./controllers');
const { middleLogin } = require('./middlewares/verification');

const { routerPost, routerUser, routerCategory } = require('./routers');

const app = express();

app.use(express.json());

app.use('/user', routerUser);

app.use('/post', routerPost);

app.use('/categories', routerCategory);

app.post('/login', middleLogin, postLogin);

module.exports = app;
