const IRClient = require('./IRClient');
const config = require('../config/app.json');

class Audio {
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
    IRClient.send(config.ir.audio.name, config.ir.audio.command.on);
  }

  static off() {
    IRClient.send(config.ir.audio.name, config.ir.audio.command.off);
  }
}

module.exports = Audio;
