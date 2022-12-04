const { User, Category, BlogPost } = require('../models');

const getById = async (id) => {
    const findId = await BlogPost
    .findByPk(id, { include: [{ model: User, as: 'user', attributes: { exclude: 'password' } },
     { model: Category, as: 'categories' }] });

    return findId;
};

module.exports = {
    getById,
};