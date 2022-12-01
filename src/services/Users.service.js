const { User } = require('../models');

const getUser = ({ email, password }) => {
    const user = User.findAll({ where: { email, password } });

    return user;
};

const createUser = async ({ displayName, email, password, image }) => {
    const emais = await User.findAll({ where: { email } });
    if (!emais) return { type: '409', message: 'User already registered' };
    const user = await User.create({ displayName, email, password, image });

    return { type: null, message: user };
};

module.exports = {
    getUser,
    createUser,
};