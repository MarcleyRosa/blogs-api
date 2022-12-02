const { createCategory } = require('../services/Category.service');

const postCategories = async (req, res) => {
    const { name } = req.body;
    const category = await createCategory(name);

    return res.status(201).json(category);
};

module.exports = {
    postCategories,
};