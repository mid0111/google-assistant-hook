var admin = require('firebase-admin');
var fs = require('fs');
var path = require('path');

var GoogleFit = require('./GoogleFit');
var TV = require('./TV');
var Podcast = require('./Podcast');
var Logger = require('./Logger');
var logger = new Logger();

var config = require('../config/app.json');
var serviceAccountFilePath = path.join(__dirname, '../config/serviceAccountKey.json');

class FirebaseHook {

  static watch() {
    var adminConfig = {
      credential: admin.credential.applicationDefault(),
      databaseURL: `https://${config.database.name}.firebaseio.com`
    };

    if (fs.existsSync(serviceAccountFilePath)) {
      // 設定ファイルがあればファイルから読み込み
      adminConfig.credential = admin.credential.cert(require(serviceAccountFilePath));
    }
    admin.initializeApp(adminConfig);

    var googleFit = new GoogleFit();

    // Google Fit のログデータ
    this.watchAndAction(config.database.path.googleFitLog, (value) => {
      googleFit.regist(value);
    });

    // TV のログデータ
    this.watchAndAction(config.database.path.tvLog, (value) => {
      TV.doAction(value);
    });

    // podcast のログデータ
    this.watchAndAction(config.database.path.podcastLog, (value) => {
      Podcast.play(value);
    });
  }

  static watchAndAction(dbPath, actionFn) {
    var db = admin.database();
    var ref = db.ref(dbPath);
    ref.on('child_added', function(snapshot, prevChildKey) {
      logger.info(`Receive data. ${prevChildKey} ${JSON.stringify(snapshot.val())}`);

      if (!prevChildKey) {
        return;
      }
      // 非同期でアクション実行
      actionFn(snapshot.val());

      // 読み終わったデータの削除
      var logRef = ref.child(prevChildKey);
      logRef.set(null);

    }, function(err) {
      logger.info('Failed to read data', err);
    });
  }
}

module.exports = FirebaseHook;
