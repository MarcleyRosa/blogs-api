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
    console.log('entreiiiiiicreate');
    console.log('ppppppppppppppppp', emais);
    if (emais.length === 0) {
        console.log('entrei eam');
     return { type: '409', message: 'User already registered' };
    }
    
    const user = await User.create({ displayName, email, password, image });
    const { password: _, ...userWithoutPassword } = user.dataValues;

    const token = jwt.sign({ data: userWithoutPassword }, secret, jwtConfig);

    return { type: null, user, token };
};

module.exports = {
    getUser,
    createUser,
};