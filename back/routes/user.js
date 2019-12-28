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

router.post('/image', uploadProfileImage.fields([{name: 'image'}, {name: 'userId'}]), user.uploadProfileImage);

router.get('/:id', isLoggedIn, user.loadSpecificUser);
router.post('/profileUpdate/:id', user.profileUpdate);

module.exports = router