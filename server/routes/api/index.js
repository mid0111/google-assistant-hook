var express = require('express');

var router = express.Router();

router.use('/profile', require('./profile'));
router.use('/stream', require('./stream'));
router.use('/rebuild', require('./rebuild'));
router.use('/shortcut', require('./shortcut'));
router.use('/alarm', require('./alarm'));

module.exports = router;
