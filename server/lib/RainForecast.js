const request = require('request');

const googleHome = require('./GoogleHome');
const FirebaseClient = require('./FirebaseClient');
var Logger = require('./Logger');
var logger = new Logger();

const config = require('../config/app.json');
const yolpWeatherPlace = config.yolp.weatherPlace;
const appId = config.yolp.applicationID;
const lat = config.rainForecast.lat;
const lon = config.rainForecast.lon;
const interval = Number(config.rainForecast.intervalSec) * 1000; // 秒をミリ秒に
const threshold = Number(config.rainForecast.threshold);

const dbPath = config.database.path.appRain;

class RainForecast {
  static watch() {
    setInterval(() => {
      const url = `${yolpWeatherPlace}?coordinates=${lon},${lat}&appid=${appId}&output=json`;
      request.get(url, (error, response, body) => {
        if (error) {
          logger.error('Failed to fetch YOLP weather place', error);
          return;
        }
        if (response.statusCode !== 200) {
          const statusError = new Error(`Failed to fetch YOLP weather place. [${response.statusCode}]`);
          logger.error(statusError.message, statusError);
          return;
        }

        this.check(JSON.parse(body));
      });
    }, interval);
  }

  static check(json) {
    const resultInfo = json.ResultInfo;
    if (Number(resultInfo.Count) <= 0) {
      const weatherPlaceError = new Error('Failed to get YOLP weather place result');
      logger.error(weatherPlaceError.message, weatherPlaceError);
      return;
    }

    // 前回チェック時に雨が降っていたかどうかを取得
    FirebaseClient.get(`${dbPath}/raining`, (err, raining) => {
      if (err) {
        logger.error('Failed to get raining flag.', err);
        return;
      }

      // 雨が降っているかどうかを取得
      const rainFall = this.getRainFall(json);
      if (rainFall && rainFall.rainFall > threshold && !raining) {
        // 前回チェック時に雨が降っておらず３０分以内に雨が降り出しそうな場合は通知
        FirebaseClient.set(dbPath, 'raining', true, (setError) => {
          if (setError) {
            logger.error('Failed to set raining flag.', setError);
          }
        });

        googleHome.notify(`${rainFall.rainDate} から ${rainFall.rainFall} ミリの雨が降り出しそうです。`, (notifyRes) => {
          logger.info(notifyRes);
        });
      } else if (!rainFall && raining) {
        // 前回チェック時に雨が降っており、３０分以内に雨が降らない場合はフラグを解除
        FirebaseClient.set(dbPath, 'raining', false, (setError) => {
          if (setError) {
            logger.error('Failed to set raining flag.', setError);
          }
        });
      }
    });
  }

  static getRainFall(json) {
    const weathers = json.Feature[0].Property.WeatherList.Weather;
    let result = null;
    // 実測値はスキップして 10〜30 分後の予報を確認
    for (let i = 1; i < 4; i += 1) {
      const weather = weathers[i];
      if (weather.Rainfall > 0) {
        if (!result || (result && result.rainFall <= weather.Rainfall)) {
          result = {
            // YYYYMMDDhhmm
            rainDate: `${weather.Date.substr(8, 2)}時${weather.Date.substr(10, 2)}分`,
            rainFall: weather.Rainfall
          };
        }
      }
    }
    return result;
  }
}

module.exports = RainForecast;
