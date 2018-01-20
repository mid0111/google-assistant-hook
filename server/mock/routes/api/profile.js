var express = require('express');

var router = express.Router();

router.get('/', function(req, res) {
  res.json({
    authenticated: false
  });
});

module.exports = router;
