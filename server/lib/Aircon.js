const exec = require('child_process').exec;

const Logger = require('./Logger');
const config = require('../config/app.json');

const logger = new Logger();

class Aircon {
  static doAction(data) {
    switch (data.text) {
      case 'heat':
        exec(`irsend SEND_ONCE ${config.ir.aircon.name} ${config.ir.aircon.command.heat}`, (error) => {
          if (error) {
            logger.error('Failed to turn on aircon (heat).', error);
          }
        });
        break;

      case 'cold':
        exec(`irsend SEND_ONCE ${config.ir.aircon.name} ${config.ir.aircon.command.cold}`, (error) => {
          if (error) {
            logger.error('Failed to turn on aircon (cold).', error);
          }
        });
        break;

      case 'stop':
        exec(`irsend SEND_ONCE ${config.ir.aircon.name} ${config.ir.aircon.command.stop}`, (error) => {
          if (error) {
            logger.error('Failed to turn off aircon.', error);
          }
        });
        break;

      default:
        // on/off 以外のデータの場合何もしない
        break;
    }
  }
}

module.exports = Aircon;
