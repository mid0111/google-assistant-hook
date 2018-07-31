const _ = require('lodash');
const uuidv4 = require('uuid/v4');
const HTTPStatus = require('http-status');
const FirebaseClient = require('./FirebaseClient');
const config = require('../config/app.json');
var Logger = require('./Logger');
var logger = new Logger();

const dbPath = config.database.path.appAlarm;

class Alarm {

  constructor(time, message, id) {
    this.time = time;
    this.message = message;
    this.id = id || uuidv4();
  }

  get() {
    return {
      id: this.id,
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
        return resolve(_.map(value, (data) => new Alarm(data.time, data.message, data.id)));
      });
    });
  }

  static updateAt(id, newAlarm) {
    let found = false;
    return Alarm.findAll().then((alarms) => {
      alarms.forEach((alarm) => {
        if (alarm.id === id) {
          alarm.time = newAlarm.time;
          alarm.message = newAlarm.message;
          found = true;
        }
      });
      const newAlarms = _.sortBy(alarms, [(alarm) => alarm.time]);
      return new Promise((resolve, reject) => {
        if (!found) {
          const notFound = new Error(HTTPStatus[HTTPStatus.NOT_FOUND]);
          notFound.statusCode = HTTPStatus.NOT_FOUND;
          reject(notFound);
        }
        FirebaseClient.set(dbPath, 'data', newAlarms, (err) => {
          if (err) {
            logger.error('Failed to remove alarm.', err);
            return reject(err);
          }
          return resolve();
        });
      });
    });
  }

  static deleteAt(id) {
    let found = false;
    return Alarm.findAll().then((alarms) => {
      alarms.forEach((alarm, index) => {
        if (alarm.id === id) {
          alarms.splice(index, 1);
          found = true;
        }
      });
      return new Promise((resolve, reject) => {
        if (!found) {
          const notFound = new Error(HTTPStatus[HTTPStatus.NOT_FOUND]);
          notFound.statusCode = HTTPStatus.NOT_FOUND;
          reject(notFound);
        }
        FirebaseClient.set(dbPath, 'data', alarms, (err) => {
          if (err) {
            logger.error('Failed to remove alarm.', err);
            return reject(err);
          }
          return resolve();
        });
      });
    });
  }

  static watch(actionFn) {
    setInterval(function() {
      Alarm.findAll().then((alarms) => {
        var now = new Date();
        var hour = now.getHours();
        var sec = now.getSeconds();
        var minute = now.getMinutes();

        alarms.forEach((alarm) => {
          const alarmHour = Number(alarm.time.substr(0, 2));
          const alarmMinute = Number(alarm.time.substr(3, 2));
          if (hour === alarmHour && minute === alarmMinute && sec === 0) {
            actionFn(alarm);
          }
        });
      });
    }, 1000);

  }

  create() {
    const data = {
      id: this.id,
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
          return resolve(data);
        });
      });
    });
  }
}

module.exports = Alarm;
