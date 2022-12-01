const jwt = require('jsonwebtoken');
require('dotenv/config');
const { getUser, createUser } = require('../services/Users.service');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '15min',
  algorithm: 'HS256',
};

const postLogin = async (req, res) => {
    const { email, password } = req.body;

    const user = await getUser({ email, password });
    
    if (!user.length) {
      return res.status(400).json({ message: 'Invalid fields' });
    }

    const token = jwt.sign({ data: email }, secret, jwtConfig);

    return res.status(200).json({ token });
};

const postUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const { type, user, token } = await createUser({ displayName, email, password, image });

  console.log(user);

  if (type) return res.status(409).json({ message: 'User already registered' });

  return res.status(201).json({ token });
};

module.exports = {
  postLogin,
  postUser,
};
