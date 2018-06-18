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

  /**
   * DB からパスで指定されたエンティティの一覧を取得する.
   * @param {String} path DB のパス
   * @param {Function} callback callback関数
   * @returns {*} callback 実行結果
   */
  static get(path, callback) {
    var db = admin.database();
    var ref = db.ref(path);
    ref.once('value', function(snapshot) {
      return callback(null, snapshot.val());
    }, function(err) {
      logger.error('Failed to read data', err);
      return callback(err);
    });
  }

  /**
   * DB のパスで指定されたエンティティを更新/追加する.
   * @param {String} path DB のパス
   * @param {String} column DB のカラム
   * @param {Object} data 更新/追加するデータ
   * @param {Function} callback callback関数
   * @returns {*} callback 実行結果
   */
  static set(path, column, data, callback) {
    var db = admin.database();
    var ref = db.ref(path);
    var usersRef = ref.child(column);
    if (data instanceof Object) {
      logger.info(`Set data. ${path} ${column} ${JSON.stringify(data)}`);
    } else {
      logger.info(`Set data. ${path} ${column} ${data}`);
    }
    usersRef.set(data, (err) => {
      if (err) {
        logger.error('Failed to set data', err);
      }
      return callback(err);
    });
  }
}

module.exports = FirebaseClient;
