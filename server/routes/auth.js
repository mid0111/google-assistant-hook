var express = require('express');
var GoogleOAuthClient = require('../lib/GoogleOAuthClient');
var Logger = require('../lib/Logger');

var router = express.Router();
var logger = new Logger();

var oauth2Client = GoogleOAuthClient.getClient();
var scopes = [
  'https://www.googleapis.com/auth/fitness.activity.write',
  'https://www.googleapis.com/auth/fitness.blood_glucose.write',
  'https://www.googleapis.com/auth/fitness.blood_pressure.write',
  'https://www.googleapis.com/auth/fitness.body.write',
  'https://www.googleapis.com/auth/fitness.body_temperature.write',
  'https://www.googleapis.com/auth/fitness.location.write',
  'https://www.googleapis.com/auth/fitness.nutrition.write',
  'https://www.googleapis.com/auth/fitness.oxygen_saturation.write',
  'https://www.googleapis.com/auth/fitness.reproductive_health.write'
];
var oauthUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline', // refresh_token を発行
  prompt: 'consent', // 毎回認証画面を出す（毎回 refresh_token を発行するため）
  scope: scopes
});

router.get('/google', function (req, res) {
  res.redirect(oauthUrl);
});

router.get('/google/callback', function (req, res, next) {
  // トークン取得
  // トークンが有効期限切れの場合は自動的にライブラリ内でリフレッシュトークンを取り直してくれる
  oauth2Client.getToken(req.query.code, function (err, tokens) {
    if (err) {
      logger.error('Failed to get token.');
      return next(err);
    }
    if (!err) {
      oauth2Client.credentials = tokens;
      logger.info(oauth2Client.credentials);
    }

    res.redirect('/');
  });
});

module.exports = router;
