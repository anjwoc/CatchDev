const passport = require('passport');
// const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const local = require('./local');
const dotenv = require('dotenv');
const db = require('../models');
dotenv.config();
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;


module.exports = () => {
  passport.serializeUser((user, done) => {
    //로그인 성공했을 시
    return done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    //서버로 들어오는 요청마다 세션정보를 디비랑 비교
    try {
      //
      const user = await db.User.findOne({
        where: { id },
        attributes: ['id','email', 'name', 'about', 'job', 'location', 'imgSrc'],
        include: [{
          model: db.Board,
          attributes: ['id'],
        },{
          model: db.Sns,
          attributes: ['github', 'gmail', 'facebook', 'userId']
        }],
      });
      return done(null, user); // req.user, req.isAuthenticated() === true,
    } catch (err) {
      console.error(err);
      return done(err);
    }
  });
  // passport.use(new FacebookStrategy({
  //   clientID: "",
  //   clientSecret: "",
  //   profileFields: ['id', 'displayName', 'photos'],
  //   callbackURL: ''
  // }, (accessToken, refreshToken, profile, done) => {
  //   const socialId = profile.id;
  //   const nickname = profile.displayName;
  //   const profileImageUrl = profile.photos[0].value;

  //   onLoginSuccess('Facebook', socialId, nickname, profileImageUrl, done);
  // }));

  passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: '/auth/github/callback'
  },
  (accessToken, refreshToken, profile, cb) => {
    return cb(null, profile);
  }));

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/'
  }, (accessToken, refreshToken, profile, done) => {
    return cb(null, profile);
  }));

  local();
};
