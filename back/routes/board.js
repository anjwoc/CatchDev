const { isLoggedIn, isNotLoggedIn, upload } = require('./middlewares');
const express = require('express');
const board = require('../controllers/board');


const router = express.Router();

router.get('/:id', board.loadBoard);
router.get('/last', board.getLastId);
router.post('/', isLoggedIn, board.addBoard);
router.post('/images', isLoggedIn, upload.array('image'), board.uploadImage);

module.exports = router