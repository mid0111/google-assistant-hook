const FirebaseClient = require('./FirebaseClient');
const TV = require('./TV');
const Light = require('./Light');
const Aircon = require('./Aircon');
const Audio = require('./Audio');
const config = require('../config/app.json');

class Shortcut {
  static doAction(data) {
    switch (data.text) {
      case 'on':
        FirebaseClient.get(`${config.database.path.appShortcut}/on`, (err, machineNames) => {
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
