const express = require('express');
const HttpStatus = require('http-status');

const config = require('../../config/app.json');
const FirebaseClient = require('../../lib/FirebaseClient');
const Shortcut = require('../../lib/Shortcut');

const router = express.Router();

router.get('/', function(req, res) {
  Shortcut.findAll().then((shortcuts) => {
      res.json({
        shortcuts: shortcuts.map((shortcut) => shortcut.get())
      });
    })
    .catch((err) => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({
          message: err.message || HttpStatus[HttpStatus.INTERNAL_SERVER_ERROR]
        });
    });
});

router.get('/:name', function(req, res) {
  const name = req.params.name;
  Shortcut.find(name).then((shortcut) => {
      res.json({
        shortcut: shortcut.get()
      });
    })
    .catch((err) => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({
          message: err.message || HttpStatus[HttpStatus.INTERNAL_SERVER_ERROR]
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
