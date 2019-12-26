const express = require('express');
const user = require('../controllers/user');
const { isLoggedIn, isNotLoggedIn, uploadProfileImage } = require('./middlewares');

const router = express.Router();

//router.get('/', isLoggedIn, test);

router.get('/', isLoggedIn, user.loadUser);
router.post('/', isNotLoggedIn, user.signUp);

router.post('/login', isNotLoggedIn, user.logIn);
router.post('/logout', isLoggedIn, user.logOut);
router.get('/test', user.test);

//image라우터 안먹힘
router.post('/image', uploadProfileImage.array('image'), user.uploadProfileImage)

router.post('/profileUpdate/:id', user.profileUpdate);

module.exports = router