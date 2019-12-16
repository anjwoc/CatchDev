const router = require('express').Router();

router.use('/user', require('./user'));
router.use('/board', require('./board'));
router.use('/boards', require('./boards'));
// router.use('/api/reply', require('./reply'));
// router.use('/api/comment', require('./comment'));
// router.use('/api/sns', require('./sns'));
//router.use('/api/image', require('./image'));

module.exports = router;