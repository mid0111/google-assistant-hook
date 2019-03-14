var express = require('express');
var router = express.Router();

router.get('/google', function(req, res) {
  var oauthUrl = 'https://example.com/oauth';
  res.redirect(oauthUrl);
});

router.get('/google/callback', function(req, res) {
  res.redirect('/');
});

module.exports = router;
