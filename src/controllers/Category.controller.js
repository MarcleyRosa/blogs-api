const { createCategory, requestAllCategories } = require('../services/Category.service');

const postCategories = async (req, res) => {
    const { name } = req.body;
    const category = await createCategory(name);

    return res.status(201).json(category);
};

const getAllCategories = async (req, res) => {
    const categories = await requestAllCategories();

    return res.status(200).json(categories);
};

module.exports = {
    postCategories,
    getAllCategories,
};