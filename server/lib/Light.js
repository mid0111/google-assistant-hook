const IRClient = require('./IRClient');
const config = require('../config/app.json');

class Light {
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
    IRClient.send(config.ir.light.name, config.ir.light.command.on);
  }

  static off() {
    IRClient.send(config.ir.light.name, config.ir.light.command.off);
  }
}

module.exports = Light;
