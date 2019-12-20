const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const express = require('express');
const comment = require('../controllers/comment');

const router = express.Router();


router.get('/:id', comment.getComments);
router.post('/:id', isLoggedIn, comment.addComment);


module.exports = router