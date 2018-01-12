var express = require('express');

var router = express.Router();

router.use('/profile', require('./profile'));
router.use('/stream', require('./stream'));

module.exports = router;