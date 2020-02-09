const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const express = require('express');
const auth = require('../controllers/auth');
const router = express.Router();

router.get('/githubAuthUrl', auth.githubAuthUrl);
router.get('/githubLogin', auth.githubLogin);
router.get('/githubUser', auth.githubUser);
// router.get('/google', auth.googleLogin);
// router.get('/google/callback', auth.googleLoginCallBack);


module.exports = router