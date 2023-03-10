const { verifyToken } = require('../middlewares/jwtFunctions');
const { createPostService, getPostService, postByIdService, updatePostService,
    deletePostService, searchPostService } = require('../services');

const createPost = async (req, res) => {
    try {
      const { title, content, categoryIds } = req.body;

      const { headers: { authorization } } = req;
      const { email } = verifyToken(authorization);

      const { type, message } = await createPostService({ title, content, categoryIds, email });

      if (type) return res.status(+type).json({ message });
    
      return res.status(201).json(message);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const getAllPost = async (req, res) => {
    try {
      const getPost = await getPostService();

      return res.status(200).json(getPost);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const getPostById = async (req, res) => {
    try {
      const { id } = req.params;
      const { type, message } = await postByIdService(id);

      if (type) return res.status(+type).json({ message });

      return res.status(200).json(message);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const updatePost = async (req, res) => {
    try {
      const { headers: { authorization } } = req;
      const { id } = req.params;
      const { title, content } = req.body;
      const { email } = verifyToken(authorization);

      const { type, message } = await updatePostService(id, email, title, content);

      if (type) return res.status(+type).json({ message });

      return res.status(200).json(message);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const deletePost = async (req, res) => {
    try {
      const { id } = req.params;
      const { headers: { authorization } } = req;

      const { email } = verifyToken(authorization);

      const { type, message } = await deletePostService(id, email);

      if (type) return res.status(+type).json({ message });

      return res.status(204).end();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const searchPost = async (req, res) => {
    try {
      const { q } = req.query;
      const search = await searchPostService(q);

      return res.status(200).json(search);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createPost,
    getAllPost,
    getPostById,
    updatePost,
    deletePost,
    searchPost,
};