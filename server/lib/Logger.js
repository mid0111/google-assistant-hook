const log4js = require('log4js');
log4js.configure({
  appenders: {
    access: {
      type: 'dateFile',
      filename: 'log/access.log'
    },
    app: {
      type: 'dateFile',
      filename: 'log/app.log'
    },
    error: {
      type: 'dateFile',
      filename: 'log/error.log'
    }
  },
  categories: {
    default: {
      appenders: ['app'],
      level: 'info'
    },
    access: {
      appenders: ['access'],
      level: 'info'
    },
    error: {
      appenders: ['error'],
      level: 'error'
    }
  }
});

class Logger {
  static connectLogger() {
    return log4js.connectLogger(log4js.getLogger('access'), {level: 'info'});
  }

  constructor() {
    this.appLogger = log4js.getLogger('app');
    this.errorLogger = log4js.getLogger('error');
  }

  info(message) {
    console.log(message);
    var output = message;
    if (typeof message === 'object') {
      output = JSON.stringify(message);
    }
    this.appLogger.info(output);
  }

  error(message, err) {
    var output = message;
    if (err) {
      output = `${output}
      ${err.stack}`;
    }
    this.errorLogger.error(output);
  }
}

module.exports = Logger;
