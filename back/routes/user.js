const express = require('express');
const user = require('../controllers/user');
const { isLoggedIn, isNotLoggedIn, uploadProfileImage } = require('./middlewares');

const router = express.Router();


router.get('/', isLoggedIn, user.loadUser);
router.get('/test', user.test);
router.get('/:id', user.loadConnectionUser);


router.post('/', isNotLoggedIn, user.signUp);
router.post('/login', isNotLoggedIn, user.logIn);
router.post('/logout', isLoggedIn, user.logOut);
router.post('/image', uploadProfileImage.fields([{name: 'image'}, {name: 'userId'}]), user.uploadProfileImage);
router.post('/updateProfile/:id', user.updateProfile);

module.exports = router