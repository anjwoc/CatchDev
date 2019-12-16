const { isLoggedIn, isNotLoggedIn, upload } = require('./middlewares');
const express = require('express');
const boards = require('../controllers/boards');


const router = express.Router();

router.get('/', boards.allPosts);

module.exports = router