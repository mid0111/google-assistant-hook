const express = require('express');
const HttpStatus = require('http-status');

const Alarm = require('../../lib/Alarm');

const router = express.Router();

router.get('/', function(req, res) {
  Alarm.findAll().then((alarms) => {
      res.json({
        alarms: alarms.map((alarm) => alarm.get())
      });
    })
    .catch((err) => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({
          message: err.message || HttpStatus[HttpStatus.INTERNAL_SERVER_ERROR]
        });
    });
});

router.post('/', function(req, res) {
  const alarm = new Alarm(req.body.time, req.body.message);
  alarm.create().then(() => {
      res.status(HttpStatus.CREATED).json({
        time: req.body.time,
        message: req.body.message
      });
    })
    .catch((err) => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({
          message: err.message || HttpStatus[HttpStatus.INTERNAL_SERVER_ERROR]
        });
    });
});

module.exports = router;
