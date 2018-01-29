const exec = require('child_process').exec;

const Logger = require('./Logger');

const logger = new Logger();

class IRClient {

  static send(name, command, callback) {
    logger.info(`irsend SEND_ONCE ${name} ${command}`);

    exec(`irsend SEND_ONCE ${name} ${command}`, (error) => {
      if (error) {
        logger.error(`Failed to send '${command}' to ${name}.`, error);
      }
      if (typeof callback === 'function') {
        return callback(error);
      }
    });
  }
}

module.exports = IRClient;
