const IRClient = require('./IRClient');
const config = require('../config/app.json');

class Aircon {
  static doAction(data) {
    switch (data.text) {
      case 'heat':
        IRClient.send(config.ir.aircon.name, config.ir.aircon.command.heat);
        break;

      case 'cold':
        IRClient.send(config.ir.aircon.name, config.ir.aircon.command.cold);
        break;

      case 'stop':
        IRClient.send(config.ir.aircon.name, config.ir.aircon.command.stop);
        break;

      default:
        // on/off 以外のデータの場合何もしない
        break;
    }
  }
}

module.exports = Aircon;
