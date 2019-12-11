const express = require('express');
const user = require('../controllers/user');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

//router.get('/', isLoggedIn, test);

router.get('/', isLoggedIn, user.loadUser);
router.post('/', isNotLoggedIn, user.signUp);
router.post('/login', isNotLoggedIn, user.logIn);
router.post('/logout', isLoggedIn, user.logOut);

module.exports = router