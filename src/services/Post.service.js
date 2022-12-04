const { Op } = require('sequelize');
const { User, Category, BlogPost, PostCategory } = require('../models');
const { getById } = require('./querys');

const createPostService = async ({ title, content, categoryIds, email }) => {
    const post = await Category.findAndCountAll({ where: { id: categoryIds } });
    const { dataValues: { id } } = await User.findOne({ where: { email }, row: true });
    
    if (post.count !== categoryIds.length) {
        return { type: '400', message: 'one or more "categoryIds" not found' };
    }
    const blogPost = await BlogPost
    .create({ title, content, userId: id, published: Date.now(), updated: Date.now() });
    
    await Promise.all(categoryIds
        .map(async (categoryId) => {
           const insert = PostCategory
        .create({ postId: blogPost.dataValues.id, categoryId });
        return insert;
    }));

    return { type: null, message: blogPost };
};

const getPostService = async () => {
    const getAllPostUser = await BlogPost
    .findAll({ include: [{ model: User, as: 'user', attributes: { exclude: 'password' } },
     { model: Category, as: 'categories' }] });

    return getAllPostUser;
};

const postByIdService = async (id) => {
    const findId = await getById(id);

    if (!findId) return { type: '404', message: 'Post does not exist' };

    return { type: null, message: findId };
};

const updatePostService = async (id, email, title, content) => {
    const [findUser] = await User.findAll({ where: { email }, raw: true });
    
    const findId = await getById(id);

    if (!findId) return { type: '404', message: 'Post not found' };
    const { dataValues: { userId } } = findId;
    if (findUser.id !== userId) return { type: '401', message: 'Unauthorized user' };

    await BlogPost.update({ title, content }, { where: { id } });

    const updatePost = await getById(id);

    return { type: null, message: updatePost };
};

const deletePostService = async (id, email) => {
    const [findUser] = await User.findAll({ where: { email }, raw: true });
    
    const find = await BlogPost.findByPk(id);
    
    if (!find) return { type: '404', message: 'Post does not exist' };
    
    const findId = await getById(id);

    const { dataValues: { userId } } = findId;
    if (findUser.id !== userId) return { type: '401', message: 'Unauthorized user' };

    const del = await BlogPost.destroy({ where: { id } });

    return { type: null, message: del };
};

const searchPostService = async (q) => {
    const likes = { [Op.like]: `%${q}%` };
    const searchs = await BlogPost.findAll({ where: { [Op.or]: [{ title: likes },
        { content: likes }] },
    include: [{ model: User, as: 'user', attributes: { exclude: 'password' } },
    { model: Category, as: 'categories' }] });

    return searchs;
};

module.exports = {
    createPostService,
    getPostService,
    postByIdService,
    updatePostService,
    deletePostService,
    searchPostService,
};