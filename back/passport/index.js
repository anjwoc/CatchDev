const passport = require('passport');
const local = require('./local');
const db = require('../models');


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
          attributes: ['github', 'gmail', 'linkedIn', 'userId']
        }],
      });
      return done(null, user); // req.user, req.isAuthenticated() === true,
    } catch (err) {
      console.error(err);
      return done(err);
    }
  });
  local();
};
