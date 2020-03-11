const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const express = require('express');
const comment = require('../controllers/comment');

const router = express.Router();

router.get('/:id', comment.getComments);

router.post('/update/:id', comment.updateComment);
router.post('/:id', isLoggedIn, comment.addComment);

router.delete('/:id', comment.deleteComment);

module.exports = router