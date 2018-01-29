const Bravia = require('bravia');

const IRClient = require('./IRClient');
const config = require('../config/app.json');
const secretConfig = require('../config/braviaSecret.json');

const bravia = new Bravia(config.tv.ip, '80', secretConfig.psk);

class TV {
  static doAction(data) {
    switch (data.text) {
      case 'on':
        IRClient.send(config.ir.audio.name, config.ir.audio.command.turnOn);
        bravia.send('WakeUp');

        break;
      case 'off':
        IRClient.send(config.ir.audio.name, config.ir.audio.command.turnOff);
        bravia.send('PowerOff');
        break;

      default:
        // on/off 以外のデータの場合何もしない
        break;
    }
  }
}

module.exports = TV;
