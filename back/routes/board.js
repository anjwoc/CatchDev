const { isLoggedIn, isNotLoggedIn, upload } = require('./middlewares');
const express = require('express');
const board = require('../controllers/board');

const router = express.Router();

// ':'문자는 와일드카드로 사용되므로 항상 가장 뒤에 적어주는게 좋다.


// 업데이트 할 게시물 로드(불 필요한 작업을 하지 않기 위해 별도로 분리)
router.get('/history/:id', board.loadUpdateBoard);
// 게시물 로드
router.get('/:id', board.loadBoard);


// 게시글  작성
router.post('/', isLoggedIn, board.addBoard);
// 이미지 업로드
router.post('/images', isLoggedIn, upload.array('image'), board.uploadImage);
// 모집 완료로 상태 변경
router.post('/:id/status', board.updateStatus);
// 좋아요 추가
router.post('/:id/like', isLoggedIn, board.addLike);

// 게시글 수정
router.post('/:id/update', board.updateBoard);

// 게시글 삭제
router.delete('/:id', board.deleteBoard);
// 좋아요 취소
router.delete('/:id/like', isLoggedIn, board.removeLike);


module.exports = router