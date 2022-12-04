const { postCategories, getAllCategories } = require('./Category.controller');
const { createPost, getAllPost, getPostById, updatePost,
    deletePost, searchPost } = require('./Post.controller');
const { postLogin, postUser, getAllUser, getUserById,
    destroyerUser } = require('./User.controller');

module.exports = {
    postCategories,
    getAllCategories,
    createPost,
    getAllPost,
    getPostById,
    updatePost,
    deletePost,
    searchPost,
    postLogin,
    postUser,
    getAllUser,
    getUserById,
    destroyerUser,
};