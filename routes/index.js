var express = require('express');
var GoogleOAuthClient = require('../lib/GoogleOAuthClient');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', {
    title: 'Google Assistant Hook',
    auth: GoogleOAuthClient.isAuthenticated()
  });
});

module.exports = router;