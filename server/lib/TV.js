const Bravia = require('bravia');

const IRClient = require('./IRClient');
const config = require('../config/app.json');
const secretConfig = require('../config/braviaSecret.json');

const bravia = new Bravia(config.tv.ip, '80', secretConfig.psk);

class TV {
  static doAction(data) {
    switch (data.text) {
      case 'on':
        this.on();
        break;

      case 'off':
        this.off();
        break;

      default:
        // on/off 以外のデータの場合何もしない
        break;
    }
  }

  static on() {
    IRClient.send(config.ir.audio.name, config.ir.audio.command.on);
    bravia.send('WakeUp');
  }

  static off() {
    IRClient.send(config.ir.audio.name, config.ir.audio.command.off);
    bravia.send('PowerOff');
  }
}

module.exports = TV;
