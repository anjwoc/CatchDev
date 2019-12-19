const { isLoggedIn, isNotLoggedIn, upload } = require('./middlewares');
const express = require('express');
const board = require('../controllers/board');


const router = express.Router();

router.get('/lastId', board.getLastId);
// ':'문자는 와일드카드로 사용되므로 항상 가장 뒤에 적어주는게 좋다.
router.get('/:id', board.loadBoard);

router.post('/', isLoggedIn, board.addBoard);
router.post('/images', isLoggedIn, upload.array('image'), board.uploadImage);

module.exports = router