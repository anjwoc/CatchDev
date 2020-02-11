const db = require('../models');
const axios = require('axios');
require('dotenv').config();

exports.test = (req, res, next) => {
  return res.send('test');
}
exports.githubCallback = async (req, res, next) => {
  try{
    const { id, displayName, username, profileUrl, emails, photos, provider} = res.req.user;
    const data = res.req.user;
    const userInfo = {
      id,
      displayName,
      username,
      profileUrl,
      email: emails[0].value,
      photo: photos[0].value,
      provider,
      about: data._json.bio,
      location: data._json.location,
      job: data._json.company
    };

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
        imgSrc: userInfo.profileUrl,
        location: userInfo.location,
        about: userInfo.about,
        job: userInfo.job,
      });
      // fullUser 처리해서 보내야됌
      
    };
    
    res.json(userInfo);
  }catch(err){
    console.error(err);
  }
};

exports.googleCallback = async (req, res, next) => {
  try{
    console.log(res.req.user);
    res.json(res.req.user)
  }catch(err){
    console.error(err);
  }
};

