var express = require('express');
var GoogleOAuthClient = require('../lib/GoogleOAuthClient');

var router = express.Router();

router.use('/auth', require('./auth'));
router.use('/stream', require('./stream'));

router.get('/', function (req, res) {
  res.render('index', {
    auth: GoogleOAuthClient.isAuthenticated()
  });
});

module.exports = router;