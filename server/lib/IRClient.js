const exec = require('child_process').exec;

const Logger = require('./Logger');

const logger = new Logger();

let index = 0;

class IRClient {

  static send(name, command, callback) {
    logger.info(`irsend SEND_ONCE ${name} ${command}`);

    setTimeout(() => {
      exec(`irsend SEND_ONCE ${name} ${command}`, (error) => {
        if (error) {
          logger.error(`Failed to send '${command}' to ${name}.`, error);
        }
        if (typeof callback === 'function') {
          return callback(error);
        }
      });
    }, this.getInterval());
  }

  static getInterval() {
    const interval = index % 5 * 300;
    index += 1;
    if (index > 5) {
      index = 0;
    }
    return interval;
  }
}

module.exports = IRClient;
