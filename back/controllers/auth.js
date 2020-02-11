const db = require('../models');
const rs = require('randomstring');
const qs = require('querystring');
const axios = require('axios');
const passport = require('passport');
require('dotenv').config();

exports.test = (req, res, next) => {
  return res.send('test');
}
exports.githubCallback = async (req, res, next) => {
  try{
    console.log(res.req.user);
    res.json(res.req.user)
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

