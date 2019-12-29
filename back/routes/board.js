const { isLoggedIn, isNotLoggedIn, upload } = require('./middlewares');
const express = require('express');
const board = require('../controllers/board');

const router = express.Router();

router.post('/', isLoggedIn, board.addBoard);
router.post('/images', isLoggedIn, upload.array('image'), board.uploadImage);
router.get('/countLike/:id', board.countLike);


// ':'문자는 와일드카드로 사용되므로 항상 가장 뒤에 적어주는게 좋다.
router.get('/:id', board.loadBoard);
router.delete('/:id', board.deleteBoard);

router.post('/:id/status', board.updateStatus);

router.post('/:id/like', isLoggedIn, board.addLike);
router.delete('/:id/like', isLoggedIn, board.removeLike);


module.exports = router