var admin = require('firebase-admin');

var Logger = require('./Logger');
var logger = new Logger();

var config = require('../config/app.json');
var serviceAccount = require('../config/serviceAccountKey.json');

class FirebaseClient {

  static initializeApp() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: `https://${config.database.name}.firebaseio.com`
    });
  }

  static watchAndAction(path, actionFn) {
    var db = admin.database();
    var ref = db.ref(path);
    ref.on('child_added', function(snapshot, prevChildKey) {
      logger.info(`Receive data. ${path} ${prevChildKey} ${JSON.stringify(snapshot.val())}`);

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

  static get(path, callback) {
    var db = admin.database();
    var ref = db.ref(path);
    ref.on('value', function(snapshot) {
      logger.info(`Receive data. ${path} ${JSON.stringify(snapshot.val())}`);
      return callback(null, snapshot.val());
    }, function(err) {
      logger.error('Failed to read data', err);
      return callback(err);
    });
  }

  static set(path, column, data, callback) {
    var db = admin.database();
    var ref = db.ref(path);
    var usersRef = ref.child(column);
    logger.info(`Set data. ${path} ${column} ${data}`);
    usersRef.set(data, (err) => {
      logger.error('Failed to set data', err);
      return callback(err);
    });
  }
}

module.exports = FirebaseClient;
