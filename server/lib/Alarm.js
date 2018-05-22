const _ = require('lodash');
const FirebaseClient = require('./FirebaseClient');
const config = require('../config/app.json');
var Logger = require('./Logger');
var logger = new Logger();

const dbPath = config.database.path.appAlarm;

class Alarm {

  constructor(time, message) {
    this.time = time;
    this.message = message;
  }

  get() {
    return {
      time: this.time,
      message: this.message
    };
  }

  static findAll() {
    return new Promise((resolve, reject) => {
      FirebaseClient.get(`${dbPath}/data`, (err, value) => {
        if (err) {
          logger.error('Failed to get alarm list.', err);
          return reject(err);
        }
        return resolve(_.map(value, (data) => new Alarm(data.time, data.message)));
      });
    });
  }

  create() {
    const data = {
      time: this.time,
      message: this.message
    };

    return Alarm.findAll().then((alarms) => {
      // 既存の Alarm 一覧にデータを挿入
      let newAlarms = alarms.map((alarm) => alarm.get());
      newAlarms.push(data);
      newAlarms = _.sortBy(newAlarms, [(alarm) => alarm.time]);

      return new Promise((resolve, reject) => {
        FirebaseClient.set(dbPath, 'data', newAlarms, (err) => {
          if (err) {
            logger.error('Failed to add alarm.', err);
            return reject(err);
          }
          return resolve();
        });
      });
    });
  }
}

module.exports = Alarm;
