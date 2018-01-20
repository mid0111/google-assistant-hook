const express = require('express');
const router = express.Router();

router.post('/', function(req, res) {
  res.status(206).send();
});

module.exports = router;
