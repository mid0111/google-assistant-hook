var google = require('googleapis');
var GoogleOAuthClient = require('../lib/GoogleOAuthClient');
var Logger = require('../lib/Logger');
var config = require('../config/app.json');

var oauth2Client = GoogleOAuthClient.getClient();
var fitness = google.fitness('v1');

var logger = new Logger();

class GoogleFit {
  regist(data) {
    switch (data.text) {
      case '開始':
        this.start = new Date().getTime() * 1000000;
        break;

      case '終了':
        if (!this.start) {
          // 開始済みでない場合は無視
          break;
        }
        this.end = new Date().getTime() * 1000000;

        if (!GoogleOAuthClient.isAuthenticated()) {
          logger.error('Failed to get token. Please authorize application before at http://localhost:3000.');
          break;
        }
        this.createDataSets();
        break;

      default:
        // 開始・終了以外のデータの場合何もしない
        break;
    }
  }

  createDataSets() {
    return new Promise((resolve, reject) => {
      var params = {
        auth: oauth2Client,
        userId: 'me',
        dataSourceId: config.googleFit.dataSourceId,
        datasetId: `${this.start}-${this.end}`,
        resource: {
          'dataSourceId': config.googleFit.dataSourceId,
          'maxEndTimeNs': this.end,
          'minStartTimeNs': this.start,
          'point': [{
            'dataTypeName': config.googleFit.dataType,
            'endTimeNanos': this.end,
            'startTimeNanos': this.start,
            'value': [{
              'intVal': 21, // 健康体操
              'mapVal': []
            }]
          }]
        }
      };

      fitness.users.dataSources.datasets.patch(params, (err) => {
        // 開始・終了時間を初期化
        this.start = undefined;
        this.end = undefined;

        if (err) {
          logger.error('Failed to regist dataset to Google Fit.', err);
          return reject(err);
        }
        return resolve();
      });
    });
  }
}

module.exports = GoogleFit;