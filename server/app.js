var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var mongoose = require('mongoose');
var passport = require('passport');
var passportSetup = require('./config/passport');

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

var db = mongoose.connection;

db.on('error', (error) => {
  console.log('db connection error: ', error)
});

db.once('open', () => {
  console.log('db connection successed')
});


var routes = require('./routes/routes');
var authRoutes = require('./routes/auth');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY]
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/', routes);
app.use('/auth', authRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('server error');
});

module.exports = app;
