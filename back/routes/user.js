const express = require('express');
const user = require('../controllers/user');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

//router.get('/', isLoggedIn, test);

router.post('/', isNotLoggedIn, user.signUp);

module.exports = router