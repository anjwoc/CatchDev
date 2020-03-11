const db = require('../models');
const qs = require('querystring');
const axios = require('axios');
require('dotenv').config();

exports.test = (req, res, next) => {
  return res.send('test');
}

exports.githubLogin = async (req, res, next) => {
  try{
    const { email, socialType } = req.body;
    const loginUser = await db.User.findOne({
      where: {
        email: email,
        socialType: socialType
      },
      attributes: ['id', 'email', 'socialType', 'name', 'about', 'imgSrc'],
      include: [{
        model: db.Board,
        attributes: ['id']
      },{
        model: db.Sns,
        attributes: ['github', 'gmail', 'facebook', 'userId']
      }]
    });
    res.json(loginUser);

  }catch(err) {
    console.error(err);
    return next(err);
  }
};

exports.githubCallback = async (req, res, next) => {
  try{
    const { id, displayName, username, profileUrl, emails, photos, provider} = res.req.user;
    const data = res.req.user;
    const userInfo = {
      id,
      displayName,
      name: username,
      profileUrl,
      email: emails[0].value,
      photo: photos[0].value,
      provider,
      about: data._json.bio,
      location: data._json.location,
      job: data._json.company
    };
    const query = qs.stringify({
      'email': userInfo.email,
      'socialType': 'github'
    });
    const exUser = await db.User.findOne({
      where: {
        email: userInfo.email,
      },
    });
    if(exUser && exUser.socialType == null){
      // 일반 회원가입으로 이미 가입한 유저 로그인 진행
      await db.User.update({
        openId: userInfo.id,
        socialType: userInfo.provider,
        imgSrc: userInfo.photo,
        location: userInfo.location,
        about: userInfo.about,
        job: userInfo.job,
      });
      // fullUser 처리해서 보내야됌
      const fullUser = await db.User.findOne({
        where: { id: exUser.id },
        attributes: ['id', 'email', 'about', 'job', 'location', 'imgSrc', 'name'],
        include: [{
          model: db.Board,
          attributes: ['id']
        },{
          model: db.Sns,
          attributes: ['github', 'gmail', 'facebook', 'userId']
        }]
      });
      const query = qs.stringify({
        'email': fullUser.email,
        'socialType': 'github'
      });
      return res.redirect(`${process.env.CLIENT_HOST}/login/${query}`);
    };
    await db.User.findOrCreate({
      where: { openId: userInfo.id },
      defaults: {
        openId: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
        socialType: userInfo.provider,
        imgSrc: userInfo.photo,
        location: userInfo.location,
        about: userInfo.about,
        job: userInfo.job,
      }
    })
      .spread((result, created) => {
        if(created) {
          return res.redirect(`${process.env.CLIENT_HOST}/login/${query}`);
        }
      });
    return res.redirect(`${process.env.CLIENT_HOST}/login/${query}`);  
    
  }catch(err){
    console.error(err);
  }
};

exports.googleCallback = async (req, res, next) => {
  try{
    const data = res.req.user;
    const userInfo = { 
      id: data.id,
      name: data.displayName,
      photo: data.photos[0].value,
      email: data.emails[0].value,
      provider: data.provider
    };
    const query = qs.stringify({
      'email': userInfo.email,
      'socialType': 'google'
    });
    const exUser = await db.User.findOne({
      where: {
        email: userInfo.email,
      },
    });
    if (exUser && exUser.socialType == null){
      // 일반 회원가입으로 이미 가입했으면 socialLogin으로 update
      await db.User.update({
        openId: userInfo.id,
        socialType: userInfo.provider,
        imgSrc: userInfo.photo,
      });

      //fullUser
      const fullUser = await db.User.findOne({
        where: { id: exUser.id },
        attributes: ['id', 'email', 'about', 'job', 'location', 'imgSrc', 'name'],
        include: [{
          model: db.Board,
          attributes: ['id']
        }, {
          model: db.Sns,
          attributes: ['github', 'gamil', 'facebook', 'userId']
        }]
      });
      return res.redirect(`${process.env.CLIENT_HOST}/login/${query}`);
    };
    await db.User.findOrCreate({
      where: { openId: userInfo.id },
      defaults: {
        openId: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
        socialType: userInfo.provider,
        imgSrc: userInfo.photo,
        location: "",
        about: "",
        job: "",
      }
    })
      .spread((result, created) => {
        if(created) {
          return res.redirect(`${process.env.CLIENT_HOST}/login/${query}`);
        }
      });
      return res.redirect(`${process.env.CLIENT_HOST}/login/${query}`);
  }catch(err){
    console.error(err);
  }
};

