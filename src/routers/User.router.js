const express = require('express');
const { postUser, getAllUser, getUserById,
    destroyerUser } = require('../controllers/User.controller');
const { middleDisplayName, middleEmail, middlePassword,
    middleToken } = require('../middlewares/verification');

const router = express.Router();

router.post('/', middleDisplayName, middlePassword, middleEmail, postUser);

router.get('/', middleToken, getAllUser);

router.get('/:id', middleToken, getUserById);

router.delete('/me', middleToken, destroyerUser);

module.exports = router;
