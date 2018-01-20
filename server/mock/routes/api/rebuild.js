const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.send({
    podcasts: [{
        title: '2: Test Title 2',
        subTitle: 'テストエピソード２などについて話しました。',
        pubDate: '2018-01-06T11:00:00.000Z',
        url: 'http://cache.dummy.fm/podcast-ep2.mp3'
      },
      {
        title: '2: Test Title 1',
        subTitle: 'テストエピソード１などについて話しました。',
        pubDate: '2017-12-24T11:00:00.000Z',
        url: 'http://cache.dummy.fm/podcast-ep1.mp3'
      }
    ]
  });
});

module.exports = router;
