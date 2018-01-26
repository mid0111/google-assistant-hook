const Bravia = require('bravia');
const exec = require('child_process').exec;

const Logger = require('./Logger');
const config = require('../config/app.json');
const secretConfig = require('../config/braviaSecret.json');

const bravia = new Bravia(config.tv.ip, '80', secretConfig.psk);
const logger = new Logger();

class TV {
  static doAction(data) {
    switch (data.text) {
      case 'on':
        exec(`irsend SEND_ONCE ${config.ir.audio.name} ${config.ir.audio.command.turnOn}`, (error) => {
          if (error) {
            logger.error('Failed to turn on audio.', error);
          }
        });
        bravia.send('WakeUp');

        break;
      case 'off':
        exec(`irsend SEND_ONCE ${config.ir.audio.name} ${config.ir.audio.command.turnOff}`, (error) => {
          if (error) {
            logger.error('Failed to turn on audio.', error);
          }
        });
        bravia.send('PowerOff');
        break;

      default:
        // on/off 以外のデータの場合何もしない
        break;
    }
  }
}

module.exports = TV;
