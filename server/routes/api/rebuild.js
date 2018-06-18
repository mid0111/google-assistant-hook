const express = require('express');
const HttpStatus = require('http-status');

const config = require('../../config/app.json');
const rebuildConfig = config.podcast.rebuild;
const Podcast = require('../../lib/Podcast');

const router = express.Router();

router.get('/', function(req, res) {
  Podcast.getPodcasts(rebuildConfig.feedRootUrl + rebuildConfig.feedPath, (error, podcasts) => {
    if (error) {
      res.status(500).json({
        message: error.message || HttpStatus[500]
      });
      return;
    }
    res.send({
      podcasts
    });
  });
});

module.exports = router;
