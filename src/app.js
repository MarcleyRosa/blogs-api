const express = require('express');
const { postCategories, getAllCategories } = require('./controllers/Category.controller');
const { createPost, getAllPost, getPostById, updatePost, 
      deletePost } = require('./controllers/Post.controller');
const { postLogin, postUser, getAllUser, getUserById,
     destroyerUser } = require('./controllers/User.controller');
const { middleLogin, middleDisplayName, middleEmail, middlePassword, middleToken,
      middleName, middlePost, middleUpdatePost } = require('./middlewares/verification');

const app = express();

app.use(express.json());

app.post('/login', middleLogin, postLogin);

app.post('/user', middleDisplayName, middlePassword, middleEmail, postUser);

app.get('/user', middleToken, getAllUser);

app.get('/user/:id', middleToken, getUserById);

app.post('/categories', middleToken, middleName, postCategories);

app.get('/categories', middleToken, getAllCategories);

app.post('/post', middlePost, middleToken, createPost);

app.get('/post', middleToken, getAllPost);

app.get('/post/:id', middleToken, getPostById);

app.put('/post/:id', middleToken, middleUpdatePost, updatePost);

app.delete('/post/:id', middleToken, deletePost);

app.delete('/user/me', middleToken, destroyerUser);

module.exports = app;
