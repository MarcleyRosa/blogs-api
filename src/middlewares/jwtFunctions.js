const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

const jwtConfig = {
  expiresIn: '15min',
  algorithm: 'HS256',
};

const tokenLogin = (autent) => {
    const token = jwt.sign({ data: autent }, secret, jwtConfig);
    return token;
};

const verifyToken = (token) => {
    const decod = jwt.verify(token, secret);
    return decod;
};

module.exports = {
    tokenLogin,
    verifyToken,
};