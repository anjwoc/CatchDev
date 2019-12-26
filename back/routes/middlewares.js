const multer = require('multer');
const path = require('path');

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()){
    return next();
  }
  return res.status(401).send('로그인이 필요합니다.');
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()){
    return next();
  }
  return res.status(401).send('로그인한 사람은 할 수 없습니다.');
};


exports.uploadProfileImage = multer({
  storage: multer.diskStorage({
    destination(req, file, done){
      done(null, 'Uploads/profileImage');
    },
    filename(req, file, done){
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext); // test.png, basename = test, ext = .png
      done(null, basename + Date.now() + ext);
    },
  }),
  limit: { fileSize: 22 * 1024 * 1024 },
});

exports.upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done){
      done(null, 'uploads');
    },
    filename(req, file, done){
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext); // test.png, basename = test, ext = .png
      done(null, basename + Date.now() + ext);
    },
  }),
  limit: { fileSize: 22 * 1024 * 1024 },
});