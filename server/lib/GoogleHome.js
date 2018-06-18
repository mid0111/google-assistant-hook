const googleHome = require('google-home-notifier');

const config = require('../config/app.json');

const lang = 'ja';
const ip = config.googleHome.ip;
googleHome.ip(ip, lang);
googleHome.device('リビング', lang);

module.exports = googleHome;
