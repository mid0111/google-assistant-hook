const IRClient = require('./IRClient');
const config = require('../config/app.json');

class Light {
  static doAction(data) {
    switch (data.text) {
      case 'on':
        IRClient.send(config.ir.light.name, config.ir.light.command.on);
        break;

      case 'off':
        IRClient.send(config.ir.light.name, config.ir.light.command.off);
        break;

      default:
        // on/off 以外のデータの場合何もしない
        break;
    }
  }
}

module.exports = Light;
