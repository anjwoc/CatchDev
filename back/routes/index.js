const router = require('express').Router();

router.use('/user', require('./user'));
router.use('/auth', require('./auth'));
router.use('/board', require('./board'));
router.use('/boards', require('./boards'));
// router.use('/reply', require('./reply'));
router.use('/comment', require('./comment'));
router.use('/sns', require('./sns'));
//router.use('/image', require('./image'));

module.exports = router;