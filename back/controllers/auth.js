const db = require('../models');
const rs = require('randomstring');
const qs = require('querystring');
const axios = require('axios');
const passport = require('passport');
require('dotenv').config();


exports.githubUser = async (req, res, next) => {
  try{
    const config = {
      headers: {
        Authorization: `token ${req.query.token}`,
        'User-Agent': 'CatchDev'
      }
    }
    await axios.get(`https://api.github.com/user`, config)
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
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: code,
      redirect_uri: `${process.env.CLIENT_HOST}/login/github`,
      state: state
    });
    const authUrl = host + querystring;
    await axios.post(host,{
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
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
      client_id: process.env.GITHUB_CLIENT_ID,
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