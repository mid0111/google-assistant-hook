const IRClient = require('./IRClient');
const config = require('../config/app.json');

class Audio {
  static doAction(data) {
    switch (data.text) {
      case 'on':
        IRClient.send(config.ir.audio.name, config.ir.audio.command.turnOn);
        break;

      case 'off':
        IRClient.send(config.ir.audio.name, config.ir.audio.command.turnOff);
        break;

      default:
        // on/off 以外のデータの場合何もしない
        break;
    }
  }
}

module.exports = Audio;
