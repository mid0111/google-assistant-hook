var express = require('express');
var GoogleOAuthClient = require('../../lib/GoogleOAuthClient');

var router = express.Router();

router.get('/', function (req, res) {
  res.json({
    authenticated: GoogleOAuthClient.isAuthenticated()
  });
});

module.exports = router;
