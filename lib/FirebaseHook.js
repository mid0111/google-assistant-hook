var admin = require('firebase-admin');

var GoogleFit = require('./GoogleFit');
var TV = require('./TV');

var config = require('../config/app.json');
var serviceAccount = require('../config/serviceAccountKey.json');

class FirebaseHook {

  static watch() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: `https://${config.database.name}.firebaseio.com`
    });

    var googleFit = new GoogleFit();

    // Google Fit のログデータ
    this.watchAndAction(config.database.path.googleFitLog, (value) => {
      googleFit.regist(value);
    });

    // TV のログデータ
    this.watchAndAction(config.database.path.tvLog, (value) => {
      TV.doAction(value);
    });
  }

  static watchAndAction(path, actionFn) {
    var db = admin.database();
    var ref = db.ref(path);
    ref.on('child_added', function (snapshot, prevChildKey) {
      console.log(prevChildKey, snapshot.val());

      if (!prevChildKey) {
        return;
      }
      // 非同期でアクション実行
      actionFn(snapshot.val());

      // 読み終わったデータの削除
      var logRef = ref.child(prevChildKey);
      logRef.set(null);

    }, function (err) {
      console.log('Failed to read data', err);
    });
  }
}

module.exports = FirebaseHook;