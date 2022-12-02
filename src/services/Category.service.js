const { Category } = require('../models');

const createCategory = async (name) => {
    const category = await Category.create({ name });

    return category;
};

const requestAllCategories = async () => {
    const categories = await Category.findAll({ row: true });

    return categories;
};

module.exports = {
    createCategory,
    requestAllCategories,
};