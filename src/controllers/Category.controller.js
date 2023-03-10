const { createCategory, requestAllCategories } = require('../services');

const postCategories = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await createCategory(name);

    return res.status(201).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await requestAllCategories();

    return res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    postCategories,
    getAllCategories,
};