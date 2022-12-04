const express = require('express');

const { postCategories, getAllCategories } = require('../controllers/Category.controller');
const { middleToken, middleName } = require('../middlewares/verification');

const router = express.Router();

router.post('/', middleToken, middleName, postCategories);

router.get('/', middleToken, getAllCategories);

module.exports = router;