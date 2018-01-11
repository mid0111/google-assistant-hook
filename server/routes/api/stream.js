const express = require('express');
const googleHome = require('google-home-notifier');

const Logger = require('../../lib/Logger');
const config = require('../../config/app.json');

const lang = 'ja';
const ip = config.googleHome.ip;
googleHome.ip(ip, lang);

const router = express.Router();
const logger = new Logger();

router.post('/', function (req, res) {
  const streamUrl = req.body.url;
  googleHome.play(streamUrl, (notifyRes) => {
    logger.info(notifyRes);
    res.status(206).send();
  });
});


module.exports = router;