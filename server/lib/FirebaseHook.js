var FirebaseClient = require('./FirebaseClient');
var GoogleFit = require('./GoogleFit');
var TV = require('./TV');
var Audio = require('./Audio');
var Podcast = require('./Podcast');
var Aircon = require('./Aircon');
var Light = require('./Light');
var Shortcut = require('./Shortcut');

var config = require('../config/app.json');

class FirebaseHook {

  static watch() {
    FirebaseClient.initializeApp();

    var googleFit = new GoogleFit();

    // Google Fit のログデータ
    FirebaseClient.watchAndAction(config.database.path.googleFitLog, (value) => {
      googleFit.regist(value);
    });

    // TV のログデータ
    FirebaseClient.watchAndAction(config.database.path.tvLog, (value) => {
      TV.doAction(value);
    });

    // オーディオ のログデータ
    FirebaseClient.watchAndAction(config.database.path.audioLog, (value) => {
      Audio.doAction(value);
    });

    // podcast のログデータ
    FirebaseClient.watchAndAction(config.database.path.podcastLog, (value) => {
      Podcast.play(value);
    });

    // エアコン のログデータ
    FirebaseClient.watchAndAction(config.database.path.airconLog, (value) => {
      Aircon.doAction(value);
    });

    // ライト のログデータ
    FirebaseClient.watchAndAction(config.database.path.lightLog, (value) => {
      Light.doAction(value);
    });

    // ショートカットのログデータ
    FirebaseClient.watchAndAction(config.database.path.shortcutLog, (value) => {
      Shortcut.doAction(value);
    });
  }
}

module.exports = FirebaseHook;
