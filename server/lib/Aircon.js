const IRClient = require('./IRClient');
const config = require('../config/app.json');

class Aircon {
  static doAction(data) {
    switch (data.text) {
      case 'heat':
        this.heatOn();
        break;

      case 'cold':
        this.coldOn();
        break;

      case 'stop':
        this.off();
        break;

      default:
        // on/off 以外のデータの場合何もしない
        break;
    }
  }

  static heatOn() {
    IRClient.send(config.ir.aircon.name, config.ir.aircon.command.heat);
  }

  static coldOn() {
    IRClient.send(config.ir.aircon.name, config.ir.aircon.command.cold);
  }

  static off() {
    IRClient.send(config.ir.aircon.name, config.ir.aircon.command.stop);
  }

}

module.exports = Aircon;
