const jwt = require('jsonwebtoken');
require('dotenv/config');
const { User, BlogPost } = require('../models');

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

    if (emais.length) return { type: '409', message: 'User already registered' };
    
    const user = await User.create({ displayName, email, password, image });
    const { password: _, ...userWithoutPassword } = user.dataValues;

    const token = jwt.sign({ data: userWithoutPassword }, secret, jwtConfig);

    return { type: null, user: userWithoutPassword, token };
};

const requestAllUsers = async () => {
    const users = await User.findAll({ attributes: { exclude: 'password' } });

    // const withoutPassword = users.reduce((acc, curr) => {
    //     const { password: _, ...userWithoutPassword } = curr;

    //     acc.push(userWithoutPassword);
    //     return acc;
    // }, []); excluindo password com reduce

    return users;
};

const requestById = async (id) => {
    const users = await User.findByPk(id, { attributes: { exclude: 'password' } });

    if (!users) return { type: 'Not found', message: users };

    return { type: null, message: users };
};

const deleteUserService = async (email) => {
    const [findUser] = await User.findAll({ where: { email }, raw: true });

    const { id } = findUser;

    await BlogPost.destroy({ where: { id } });
};

module.exports = {
    getUser,
    createUser,
    requestAllUsers,
    requestById,
    deleteUserService,
};