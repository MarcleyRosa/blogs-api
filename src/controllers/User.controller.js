const { getUser, createUser } = require('../services/Users.service');

const postLogin = async (req, res) => {
    const { email, password } = req.body;

    const user = await getUser({ email, password });

    if (!user.length) {
        return res.status(400).json({ message: 'Invalid fields' });
    }

    return res.status(200).json(user);
};

const postUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const { type, message } = await createUser({ displayName, email, password, image });

  if (type) return res.status(Number(type)).json(message);

  return res.status(201).json(message);
};

module.exports = {
  postLogin,
  postUser,
};
