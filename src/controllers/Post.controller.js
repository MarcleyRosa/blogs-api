const { verifyToken } = require('../middlewares/jwtFunctions');
const { createPostService, getPostService, postByIdService } = require('../services/Post.service');

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

    return res.status(200).json(getPost);
};

const getPostById = async (req, res) => {
    const { id } = req.params;
    const { type, message } = await postByIdService(id);

    if (type) return res.status(+type).json({ message });

    const [result] = message;

    return res.status(200).json(result);
};

module.exports = {
    createPost,
    getAllPost,
    getPostById,
};