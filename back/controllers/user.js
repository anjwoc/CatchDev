const db = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');


//로그인이 새로고침되도 유지하기 위해서 사용하는 get요청
exports.loadUser = async (req, res, next) => {
  try{
    const user = req.user;
    console.log(user);
    res.json(user);
  }catch(err){
    console.error(err)
    next(err);
  }
};

 // post 회원가입
exports.signUp = async (req, res, next) => {
  try{
    const hash = await bcrypt.hash(req.body.password, 12);
    const exUser = await db.User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if(exUser){ //이미 회원가입한 사람
      return res.status(403).json({
        errorCode: 1,
        message: '이미 회원가입되어있습니다.',
      });
    }
    await db.User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
      about: req.body.about,
    }); // HTTP STATUS CODE
    
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      if (info) {
        return res.status(401).send(info.reason);
      }
      return req.login(user, async (err) => { // 세션에다 사용자 정보 저장 (어떻게? serializeUser)
        if (err) {
          console.error(err);
          return next(err);
        }
        const fullUser = await db.User.findOne({
          where: { id: user.id },
          attributes: ['id', 'email', 'name'],
          include: [{
            model: db.Board,
            attributes: ['id'],
          }],
        });
        return res.json(fullUser);
      });
    })(req, res, next);

  }catch(err){
    console.error(err);
    return next(err);
  };
};

exports.logIn = async (req, res, next) => {
  //done(에러, 성공, 실패)
  passport.authenticate('local', (err, user, info) => {
    if (err) { // 에러가 발생하면
      console.error(err);
      return next(err);
    }
    if (info) { // 에러 사유
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (err) => { // 세션에다 사용자 정보 저장 (어떻게? serializeUser)
      if (err) {
        console.error(err);
        return next(err);
      }
      const fullUser = await db.User.findOne({
        where: { id: user.id },
        attributes: ['id', 'email', 'name'],
        include: [{
          model: db.Board,
          attributes: ['id'],
        }],
      });
      return res.json(fullUser);
    });
  })(req, res, next);
};


exports.logOut = async (req, res, next) => {
  try{
    if (req.isAuthenticated()) {
      req.logout();
      req.session.destroy(); // 선택사항
      return res.status(200).send('로그아웃 되었습니다.');
    }
  }catch(err){
    console.error(err);
    return next(err);
  }
};