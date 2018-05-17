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
      FirebaseClient.get(dbPath, (err, value) => {
        if (err) {
          logger.error('Failed to get alarm list.', err);
          return reject(err);
        }
        return resolve(_.map(value, (data) => new Alarm(data.time, data.message)));
      });
    });
  }
}

module.exports = Alarm;
