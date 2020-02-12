const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const express = require('express');
const passport = require('passport');
const auth = require('../controllers/auth');
const router = express.Router();


router.get('/github', passport.authenticate('github'));
router.post('/githubLogin', auth.githubLogin);
router.get('/github/callback',
 passport.authenticate('github', { failureRedirect: '/login' }),
 auth.githubCallback
);

router.get('/google', passport.authenticate('google'));
router.get('/google/callback',
  passport.authenticate('google', {
  failureRedirect: '/login'}),
  auth.googleCallback
);


module.exports = router