const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'secretJWT';

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const tokenLogin = (email) => {
    const token = jwt.sign({ email }, secret, jwtConfig);
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