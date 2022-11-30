const { getUser } = require('../services/Users.service');

const postLogin = async (req, res) => {
    const { email, password } = req.body;

    const user = await getUser({ email, password });

    if (!user.length) {
        return res.status(400).json({ message: 'Invalid fields' });
    }

    return res.status(200).json(user);
};

const postUser = async (req, res) => {

};

module.exports = {
  postLogin,
  postUser,
};
