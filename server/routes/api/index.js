var express = require('express');

var router = express.Router();

router.use('/profile', require('./profile'));
router.use('/stream', require('./stream'));
router.use('/rebuild', require('./rebuild'));

module.exports = router;
