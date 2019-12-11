const db = require('../models');
const passport = require('passport');


//이미지 업로드
exports.uploadImage = (req, res, next) => {
  console.log(req.files);
  res.json(req.files.map(v => v.filename));
};
