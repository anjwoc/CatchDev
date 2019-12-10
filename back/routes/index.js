const router = require('express').Router();

router.use('/user', require('./user'));
// router.use('/board', require('./board'));
// router.use('/reply', require('./reply'));
// router.use('/comment', require('./comment'));
// router.use('/sns', require('./sns'));
//router.use('/image', require('./image'));

module.exports = router;