const { isLoggedIn, isNotLoggedIn, upload } = require('./middlewares');
const express = require('express');
const reply = require('../controllers/reply');

const router = express.Router();

router.get('/test', reply.test);

module.exports = router