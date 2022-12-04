const express = require('express');

const { postLogin } = require('./controllers');
const { middleLogin } = require('./middlewares/verification');

const { routerPost, routerUser, routerCategory } = require('./routers');

require('express-async-errors');

const app = express();

app.use(express.json());

app.use('/user', routerUser);

app.use('/post', routerPost);

app.use('/categories', routerCategory);

app.post('/login', middleLogin, postLogin);

app.use((error, _req, _res, next) => {
      console.error(error.stack);
      next(error);
});

app.use((error, _req, res, _next) => {
      res.status(500).send({ message: `Deu ruim ${error.message}` });
});

module.exports = app;
