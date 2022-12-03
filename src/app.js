const express = require('express');
const { postCategories, getAllCategories } = require('./controllers/Category.controller');
const { createPost } = require('./controllers/Post.controller');
const { postLogin, postUser, getAllUser, getUserById } = require('./controllers/User.controller');
const { middleLogin, middleDisplayName, middleEmail,
     middlePassword, middleToken, middleName, middlePost } = require('./middlewares/verification');

const app = express();

app.use(express.json());

app.post('/login', middleLogin, postLogin);

app.post('/user', middleDisplayName, middlePassword, middleEmail, postUser);

app.get('/user', middleToken, getAllUser);

app.get('/user/:id', middleToken, getUserById);

app.post('/categories', middleToken, middleName, postCategories);

app.get('/categories', middleToken, getAllCategories);

app.post('/post', middlePost, middleToken, createPost);

module.exports = app;
