const { tokenLogin } = require('../middlewares/jwtFunctions');
require('dotenv/config');
const { getUser, createUser, requestAllUsers } = require('../services/Users.service');

const postLogin = async (req, res) => {
    const { email, password } = req.body;

    const user = await getUser({ email, password });
    
    if (!user.length) {
      return res.status(400).json({ message: 'Invalid fields' });
    }

    const token = tokenLogin(email);

    return res.status(200).json({ token });
};

const postUser = async (req, res) => {
  try {
  const { displayName, email, password, image } = req.body;

  const { type, user, token } = await createUser({ displayName, email, password, image });

  if (type) return res.status(409).json({ message: 'User already registered' });

  return res.status(201).json({ user, token });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

const getAllUser = async (req, res) => {
  const users = await requestAllUsers();

  return res.status(200).json(users);
};

module.exports = {
  postLogin,
  postUser,
  getAllUser,
};
