const exec = require('child_process').exec;

const Logger = require('./Logger');
const config = require('../config/app.json');

const logger = new Logger();

class Light {
  static doAction(data) {
    switch (data.text) {
      case 'on':
        exec(`irsend SEND_ONCE ${config.ir.light.name} ${config.ir.light.command.on}`, (error) => {
          if (error) {
            logger.error('Failed to turn on light.', error);
          }
        });
        break;

      case 'off':
        exec(`irsend SEND_ONCE ${config.ir.light.name} ${config.ir.light.command.off}`, (error) => {
          if (error) {
            logger.error('Failed to turn off light.', error);
          }
        });
        break;

      default:
        // on/off 以外のデータの場合何もしない
        break;
    }
  }
}

module.exports = Light;
