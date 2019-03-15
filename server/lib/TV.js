const Bravia = require('bravia');

const Logger = require('./Logger');
const config = require('../config/app.json');
const secretConfig = require('../config/braviaSecret.json');

const bravia = new Bravia(config.tv.ip, '80', secretConfig.psk);
const logger = new Logger();

class TV {
  static doAction(data) {
    switch (data.text) {
      case 'on':
        this.on();
        break;

      case 'off':
        this.off();
        break;

      case 'channel2':
        this.channel2();
        break;

      case 'hdmi1':
        this.hdmi1();
        break;

      default:
        // on/off 以外のデータの場合何もしない
        break;
    }
  }

  static on() {
    bravia.send('WakeUp')
      .catch((err) => logger.error('Failed to wake up TV.', err));
  }

  static off() {
    bravia.send('PowerOff')
      .catch((err) => logger.error('Failed to turn off TV.', err));
  }

  static channel2() {
    bravia.send('WakeUp')
      .then(() => bravia.send('Num2'))
      .catch((err) => logger.error('Failed to send command to TV.', err));
  }

  static hdmi1() {
    bravia.send('WakeUp')
      .then(() => bravia.send('Hdmi1'))
      .catch((err) => logger.error('Failed to send command to TV.', err));
  }
}

module.exports = TV;
