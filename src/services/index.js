const { createCategory, requestAllCategories } = require('./Category.service');
const { createPostService, getPostService, postByIdService, updatePostService,
    deletePostService, searchPostService } = require('./Post.service');
const { getUser, createUser, requestAllUsers, requestById,
    deleteUserService } = require('./Users.service');

module.exports = {
    getUser,
    createUser,
    requestAllUsers,
    requestById,
    deleteUserService,
    createPostService,
    getPostService, 
    postByIdService, 
    updatePostService, 
    deletePostService, 
    searchPostService,
    createCategory,
    requestAllCategories,
};