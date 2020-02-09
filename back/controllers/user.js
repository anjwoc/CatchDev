const db = require('../models');
const bcrypt = require('bcrypt');
const rs = require('randomstring');
const qs = require('querystring');
const axios = require('axios');
const passport = require('passport');
require('dotenv').config();

<<<<<<< HEAD
=======
exports.githubUser = async (req, res, next) => {
  try{
    await axios.get(`https://api.github.com/user?access_token=${req.query.token}`)
      .then((result) => {
        console.log(result.data);
        return res.send(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }catch(err){
    console.error(err);
  }
};

// github access_token 요청 컨트롤러
exports.githubLogin = async (req, res, next) => {
  try{
    const { code, state } = req.query;
    if(state != state){
      return res.send(false);
    };

    const host = 'https://github.com/login/oauth/access_token?'
    const querystring = qs.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code: code,
      redirect_uri: `${process.env.CLIENT_HOST}/login/github`,
      state: state
    });
    const authUrl = host + querystring;
    await axios.post(host,{
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code: code,
      redirect_uri: `${process.env.CLIENT_HOST}/login/github`,
      state: state
    })
      .then((result) => {
        console.log("-------------access_token 요청---------------");
        const parseData = qs.parse(result.data);
        const access_token = parseData.access_token;
        console.log(`access_token: ${access_token}`);
        return res.send(access_token);
      })
      .catch((err) => {
        console.error(err);
      });

  }catch(err) {
    console.error(err);
    next(err);
  }
};

// githubAuthUrl 요청 컨트롤러
exports.githubAuthUrl = async (req, res, next) => {
  try{
    state = rs.generate();
    const url = 'https://github.com/login/oauth/authorize?';
    const query = qs.stringify({
      client_id: process.env.CLIENT_ID,
      redirect_uri: process.env.CLIENT_HOST + '/login/github',
      state: state,
      scope: 'user'
    });
    const githubAuthUrl = url + query;
    return res.send(githubAuthUrl);
  }catch(err){
    console.error(err);
    next(err);
  }
};
>>>>>>> 91788550f2775ff97dc4e98cf448b4662b2c8504


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

exports.loadConnectionUser = async (req, res, next) => {
  try{
    const user = await db.User.findOne({
      where : { id: req.params.id},
      attributes: ['id','email', 'about', 'job', 'location', 'imgSrc', 'name'],
      include: [{
        model: db.Sns,
        attributes: ['github', 'gmail', 'linkedIn', 'userId']
      }]
    });
    res.json(user);
  }catch(err) {
    console.error(err);
    next(err);
  }
};

// Password Update하는 컨트롤러
exports.updatePassword = async (req, res, next) => {
  try{
    const hash = await bcrypt.hash(req.body.password, 12);
    const result = await db.User.update({
      password: hash,
    },{
      where: {
        id: req.body.id,
      }
    });
    res.json(result);
  }catch(err) {
    console.error(err);
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
          attributes: ['id','email', 'name', 'about', 'job', 'location', 'imgSrc'],
          include: [{
            model: db.Board,
            attributes: ['id'],
          },{
            model: db.Sns,
            attributes: ['github', 'gmail', 'linkedIn', 'userId']
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

// 로그인하는 컨트롤러
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
        attributes: ['id','email', 'name', 'about', 'job', 'location', 'imgSrc'],
        include: [{
          model: db.Board,
          attributes: ['id'],
        },{
          model: db.Sns,
          attributes: ['github', 'gmail', 'linkedIn', 'userId']
        }],
      });
      return res.json(fullUser);
    });
  })(req, res, next);
};

// 로그아웃하는 컨트롤러
exports.logOut = async (req, res, next) => {
  try{
    if (req.isAuthenticated()) {
      req.logout();
      req.session.destroy(); // 선택사항
      return res.clearCookie('connect.sid', {path: '/'}).status(200).send('로그아웃 되었습니다.');
    }
  }catch(err){
    console.error(err);
    return next(err);
  }
};

// 프로필 이미지를 업로드하는 컨트롤러
exports.uploadProfileImage = async (req, res, next) => {
  try{
    const user = await db.User.findOne({ where : { id: req.body.userId }});
    if(!user){ 
      res.status(404).send('회원이 존재하지 않습니다');
    }
    if(req.files.image !== undefined){
      //일단 개발 중엔 하드코딩하고 나중에 dotenv로 가저올 예정
      const serverName = 'http://localhost:4000/profile/';
      const imageName = req.files.image[0].filename || '';
      const filename = serverName + imageName;

      if(filename !== user.dataValues.imgSrc && imageName !== ''){
        await db.User.update({
          imgSrc: filename,
        },{
          where: { id: req.body.userId },
        });
        return res.json(filename);
      }
    }        
    return res.json("No Change");
    
  }catch(err){
    console.error(err);
  }
};

// 프로필을 업데이트하는 컨트롤러
exports.updateProfile = async (req, res, next) => {
  try{ 
    let { job, location, imgSrc } = req.body;
    await db.User.update({
      job: job,
      location: location,
      imgSrc: imgSrc, 
    },{
      where: { id : req.params.id },
    })
    
    const user = await db.User.findOne({ where: { id: req.params.id }});
    res.json(user);

  }catch(err){
    console.error(err);
  }
};