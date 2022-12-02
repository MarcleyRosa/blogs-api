const jwt = require('jsonwebtoken');
require('dotenv/config');
const { User } = require('../models');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '15min',
  algorithm: 'HS256',
};

const getUser = ({ email, password }) => {
    const user = User.findAll({ where: { email, password } });

    return user;
};

const createUser = async ({ displayName, email, password, image }) => {
    const emais = await User.findAll({ where: { email } });

    if (emais.length === 0) {
        console.log('entrei eam');
     return { type: '409', message: 'User already registered' };
    }
    
    const user = await User.create({ displayName, email, password, image });
    const { password: _, ...userWithoutPassword } = user.dataValues;

    const token = jwt.sign({ data: userWithoutPassword }, secret, jwtConfig);

    return { type: null, user: userWithoutPassword, token };
};

const requestAllUsers = async () => {
    const users = await User.findAll({ raw: true });

    const withoutPassword = users.reduce((acc, curr) => {
        const { password: _, ...userWithoutPassword } = curr;

        acc.push(userWithoutPassword);
        return acc;
    }, []);

    return withoutPassword;
};

const requestById = async (id) => {
    const users = await User.findByPk(id);

    if (!users) return { type: 'Not found', message: users };

    const { password: _, ...userWithoutPassword } = users.dataValues;

    return { type: null, message: userWithoutPassword };
};

module.exports = {
    getUser,
    createUser,
    requestAllUsers,
    requestById,
};