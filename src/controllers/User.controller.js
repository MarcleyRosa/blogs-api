const { tokenLogin, verifyToken } = require('../middlewares/jwtFunctions');
require('dotenv/config');
const { getUser, createUser, requestAllUsers, requestById,
   deleteUserService } = require('../services');

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await getUser({ email, password });
    
    if (!user.length) {
      return res.status(400).json({ message: 'Invalid fields' });
    }

    const token = tokenLogin(email);

    return res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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

const getAllUser = async (_req, res) => {
  try {
    const users = await requestAllUsers();
    return res.status(200).json(users);  
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, message } = await requestById(id);

    if (type) return res.status(404).json({ message: 'User does not exist' });

    return res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const destroyerUser = async (req, res) => {
  try {
    const { headers: { authorization } } = req;
    const { email } = verifyToken(authorization);

    await deleteUserService(email);

    return res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postLogin,
  postUser,
  getAllUser,
  getUserById,
  destroyerUser,
};
