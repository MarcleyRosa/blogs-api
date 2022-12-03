const { verifyToken } = require('../middlewares/jwtFunctions');
const { createPostService, getPostService } = require('../services/Post.service');

const createPost = async (req, res) => {
    try {
    const { title, content, categoryIds } = req.body;

    const { headers: { authorization } } = req;
    const { email } = verifyToken(authorization);

    const { type, message } = await createPostService({ title, content, categoryIds, email });

    if (type) return res.status(+type).json({ message });
    
    return res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllPost = async (req, res) => {
    const getPost = await getPostService();

    console.log('controleeeeeeeeeeeeeeeee', getPost);

    return res.status(200).json(getPost);
};

module.exports = {
    createPost,
    getAllPost,
};