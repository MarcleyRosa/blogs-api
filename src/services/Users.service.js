const { User } = require('../models');

const getUser = ({ email, password }) => {
    const user = User.findAll({ where: { email, password } });

    return user;
};

module.exports = {
    getUser,
};