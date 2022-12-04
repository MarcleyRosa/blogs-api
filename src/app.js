const express = require('express');

const { postLogin } = require('./controllers/User.controller');
const { middleLogin } = require('./middlewares/verification');

const routerUser = require('./routers/User.router');
const routerPost = require('./routers/Post.router');
const routerCategory = require('./routers/Category.router');

const app = express();

app.use(express.json());

app.use('/user', routerUser);

app.use('/post', routerPost);

app.use('/categories', routerCategory);

app.post('/login', middleLogin, postLogin);

module.exports = app;
