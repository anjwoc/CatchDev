const db = require('../models');
const axios = require('axios');
const passport = require('passport');
require('dotenv').config();

exports.test = (req, res, next) => {
  res.send('test');
}
