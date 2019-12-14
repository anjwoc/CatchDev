const express = require('express');
const board = require('../controllers/board');
const { isLoggedIn, isNotLoggedIn, upload } = require('./middlewares');

const router = express.Router();

router.post('/', isLoggedIn, board.addBoard);
router.post('/images', isLoggedIn, upload.array('image'), board.uploadImage);

module.exports = router