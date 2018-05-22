const _ = require('lodash');
const FirebaseClient = require('./FirebaseClient');
const TV = require('./TV');
const Light = require('./Light');
const Aircon = require('./Aircon');
const Audio = require('./Audio');
const config = require('../config/app.json');
var Logger = require('./Logger');
var logger = new Logger();

const dbPath = config.database.path.appShortcut;

class Shortcut {

  constructor(name, data) {
    this.name = name;
    this.data = data;
  }

  get() {
    return {
      name: this.name,
      data: this.data
    };
  }

  static findAll() {
    return new Promise((resolve, reject) => {
      FirebaseClient.get(dbPath, (err, value) => {
        if (err) {
          logger.error('Failed to get shortcuts.', err);
          return reject(err);
        }
        return resolve(_.map(value, (shortcutValue, shortcutName) => new Shortcut(shortcutName, shortcutValue)));
      });
    });
  }

  static find(name) {
    return new Promise((resolve, reject) => {
      FirebaseClient.get(`${dbPath}/${name}`, (err, value) => {
        if (err) {
          logger.error('Failed to get shortcut.', err);
          return reject(err);
        }

        return resolve(new Shortcut(name, value));
      });
    });
  }

  static doAction(data) {
    switch (data.text) {
      case 'on':
        FirebaseClient.get(`${dbPath}/on`, (err, machineNames) => {
          if (err) {
            return;
          }
          machineNames.forEach((machineName) => {
            switch (machineName) {
              case 'tv':
                TV.on();
                break;

              case 'audio':
                if (machineNames.indexOf('tv') >= 0) {
                  // TV を含む場合、TV でまとめてオーディオの電源も制御しているため何もしない
                  break;
                }
                Audio.on();
                break;

              case 'light':
                Light.on();
                break;

              case 'heat':
                Aircon.heatOn();
                break;

              case 'cold':
                Aircon.coldOn();
                break;

              default:
                break;
            }
          });
        });
        break;

      case 'off':
        FirebaseClient.get(`${config.database.path.appShortcut}/on`, (err, machineNames) => {
          if (err) {
            return;
          }
          machineNames.forEach((machineName) => {
            switch (machineName) {
              case 'tv':
                TV.off();
                break;

              case 'audio':
                if (machineNames.indexOf('tv') >= 0) {
                  // TV を含む場合、TV でまとめてオーディオの電源も制御しているため何もしない
                  break;
                }
                Audio.off();
                break;

              case 'light':
                Light.off();
                break;

              case 'heat':
              case 'cold':
                Aircon.off();
                break;

              default:
                break;
            }
          });
        });
        break;

      default:
        // on/off 以外のデータの場合何もしない
        break;
    }
  }
}

module.exports = Shortcut;
