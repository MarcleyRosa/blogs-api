const express = require('express');

const { createPost, getAllPost, getPostById, updatePost, 
    deletePost, searchPost } = require('../controllers');
const { middleToken, middlePost, middleUpdatePost } = require('../middlewares/verification');

const router = express.Router();

router.get('/search', middleToken, searchPost);

router.post('/', middlePost, middleToken, createPost);

router.get('/', middleToken, getAllPost);

router.get('/:id', middleToken, getPostById);

router.put('/:id', middleToken, middleUpdatePost, updatePost);

router.delete('/:id', middleToken, deletePost);

module.exports = router;
