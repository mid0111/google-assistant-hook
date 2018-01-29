const express = require('express');
const HttpStatus = require('http-status');
const _ = require('lodash');

const config = require('../../config/app.json');
const FirebaseClient = require('../../lib/FirebaseClient');

const router = express.Router();

router.get('/', function(req, res) {
  FirebaseClient.get(config.database.path.appShortcut, (err, value) => {
    if (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({
          message: err.message || HttpStatus[HttpStatus.INTERNAL_SERVER_ERROR]
        });
      return;
    }

    res.json({
      shortcuts: _.map(value, (shortcutValue, shortcutName) => ({
        name: shortcutName,
        data: shortcutValue
      }))
    });
  });
});

router.get('/:name', function(req, res) {
  const name = req.params.name;
  FirebaseClient.get(`${config.database.path.appShortcut}/${name}`, (err, value) => {
    if (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({
          message: err.message || HttpStatus[HttpStatus.INTERNAL_SERVER_ERROR]
        });
      return;
    }

    res.json({
      shortcut: {
        name,
        data: value
      }
    });
  });
});

router.put('/:name', function(req, res) {
  const name = req.params.name;
  let data = req.body.data;

  // 小文字にして登録
  data = data.map((machineName) => machineName.toLowerCase());

  FirebaseClient.set(config.database.path.appShortcut, name, data, (err) => {
    if (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({
          message: err.message || HttpStatus[HttpStatus.INTERNAL_SERVER_ERROR]
        });
      return;
    }

    res.json({
      shortcut: {
        name,
        data
      }
    });
  });
});

module.exports = router;
