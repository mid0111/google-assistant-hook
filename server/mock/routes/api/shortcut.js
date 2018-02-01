const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.json({
    shortcuts: [{
        name: 'on',
        data: [
          'light',
          'tv',
          'audio',
          'heat'
        ]
      },
      {
        name: 'off',
        data: [
          'light',
          'tv',
          'audio',
          'aircon'
        ]
      }
    ]
  });
});

router.put('/:name', function(req, res) {
  res.json({
    shortcut: {
      name: req.params.name,
      data: req.body.data
    }
  });
});

module.exports = router;
