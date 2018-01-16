const express = require('express');
const googleHome = require('google-home-notifier');
const HttpStatus = require('http-status');

const config = require('../../config/app.json');
const Podcast = require('../../lib/Podcast');

const lang = 'ja';
const ip = config.googleHome.ip;
googleHome.ip(ip, lang);

const router = express.Router();

router.get('/', function(req, res) {
  Podcast.getPodcasts(config.podcast.rebuild.feedUrl, (error, podcasts) => {
    if (error) {
      res.status(500).json({
        message: error.message || HttpStatus[500]
      });
      return;
    }
    res.send(podcasts);
  });
});

module.exports = router;