const express = require('express');
const { postLogin } = require('../controllers');
const { middleLogin } = require('../middlewares/verification');

const router = express.Router();

router.post('/login', middleLogin, postLogin);

module.exports = router;