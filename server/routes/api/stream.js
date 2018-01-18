const express = require('express');
const googleHome = require('google-home-notifier');
const request = require('request');
const HttpStatus = require('http-status');

const Logger = require('../../lib/Logger');
const config = require('../../config/app.json');

const lang = 'ja';
const ip = config.googleHome.ip;
googleHome.ip(ip, lang);

const router = express.Router();
const logger = new Logger();

router.post('/', function(req, res) {
  const streamUrl = req.body.url;
  if (!streamUrl) {
    logger.error('Stream url is required.');
    res.status(400).json({
      message: 'Stream url is required.'
    });
    return;
  }

  request.get(streamUrl, (error, streamResponse) => {
    if (error) {
      logger.error('Failed to check stream url.', error);
      res.status(503).json({
        message: error.message || HttpStatus[503]
      });
      return;
    }
    if (streamResponse.statusCode >= 400) {
      logger.error(`Stream url is invalid. ${streamResponse.statusCode} ${streamResponse.body}`);
      res.status(streamResponse.statusCode).json({
        message: streamResponse.body || HttpStatus[streamResponse.statusCode]
      });
      return;
    }
    googleHome.play(streamUrl, (notifyRes) => {
      logger.info(notifyRes);
      res.status(206).send();
    });

  });
});

module.exports = router;
