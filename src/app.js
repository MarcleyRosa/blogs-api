const express = require('express');

const { routerPost, routerUser, routerCategory, routerLogin } = require('./routers');

require('express-async-errors');

const app = express();

app.use(express.json());

app.use('/user', routerUser);

app.use('/post', routerPost);

app.use('/categories', routerCategory);

app.use('/', routerLogin);

app.use((error, _req, _res, next) => {
      console.error(error.stack);
      next(error);
});

app.use((error, _req, res, _next) => {
      res.status(500).send({ message: `Deu ruim ${error.message}` });
});

module.exports = app;
