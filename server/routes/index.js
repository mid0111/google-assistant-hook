var express = require('express');
var GoogleOAuthClient = require('../lib/GoogleOAuthClient');

var router = express.Router();

router.use('/auth', require('./auth'));

router.get('/', function (req, res) {
  res.render('index', {
    auth: GoogleOAuthClient.isAuthenticated()
  });
});

router.use('/api', require('./api'));

module.exports = router;