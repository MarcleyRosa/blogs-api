const { User, Category, BlogPost, PostCategory } = require('../models');

const createPostService = async ({ title, content, categoryIds, email }) => {
    const post = await Category.findAndCountAll({ where: { id: categoryIds } });
    const { dataValues: { id } } = await User.findOne({ where: { email }, row: true });
    
    console.log(post);
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
    const tesss = await PostCategory.findAll({ row: true });

    console.log('asssssssssssss', tesss);

    // await PostCategory.create({ postId: 7, categoryId: 15 });

    return { type: null, message: blogPost };
};

module.exports = {
    createPostService,
};