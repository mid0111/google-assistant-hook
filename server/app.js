var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var AccessLogger = require('./lib/Logger');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(AccessLogger.connectLogger());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.all('/*', function(req, res) {
  // Just send the index.html for other files to support HTML5Mode
  res.sendFile('index.html', {
    root: path.join(__dirname, 'public')
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) { // eslint-disable-line no-unused-vars
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) { // eslint-disable-line no-unused-vars
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {}
  });
});

// Firebase のフック設定
var FirebaseHook = require('./lib/FirebaseHook');
FirebaseHook.watch();

// アラームの設定
const Alarm = require('./lib/Alarm');
const googleHome = require('./lib/GoogleHome');
Alarm.watch((alarm) => {
  googleHome.notify(`${alarm.time}です。${alarm.message} ${alarm.message}`);
});

module.exports = app;
