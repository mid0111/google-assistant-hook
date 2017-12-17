var admin = require('firebase-admin');

var GoogleFit = require('./GoogleFit');

var config = require('../config/app.json');
var serviceAccount = require('../config/serviceAccountKey.json');

class FirebaseHook {

  static watch() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: `https://${config.database.name}.firebaseio.com`
    });

    var db = admin.database();
    var googleFit = new GoogleFit();

    // Google Fit のログデータ
    var ref = db.ref(config.database.path.googleFitLog);
    ref.on('child_added', function (snapshot, prevChildKey) {
      console.log(prevChildKey, snapshot.val());

      if (!prevChildKey) {
        return;
      }
      // 非同期でデータ登録
      googleFit.regist(snapshot.val());

      // 読み終わったデータの削除
      var logRef = ref.child(prevChildKey);
      logRef.set(null);

    }, function (err) {
      console.log('Failed to read data', err);
    });
  }
}

module.exports = FirebaseHook;