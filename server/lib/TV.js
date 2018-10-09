const Bravia = require('bravia');

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
    bravia.send('WakeUp');
  }

  static off() {
    bravia.send('PowerOff');
  }
}

module.exports = TV;
