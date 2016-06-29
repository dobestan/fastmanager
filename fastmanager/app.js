var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var async = require('async');

var mongo = require('mongodb');
var mongoose = require('mongoose');

var passport = require('passport');
var LocalStrategy = require('passport-local'),Strategy;

// MongoDB 데이터베이스 접속하기
mongoose.connect('mongodb://localhost/fastmanager');
var db = mongoose.connection;

var routes = require('./routes/index');
var users = require('./routes/users');
var students = require('./routes/students');
var teachers = require('./routes/teachers');
var lectures = require('./routes/lectures');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Flash Messages
app.use(flash());
app.use(function (request, response, next) {
  response.locals.messages = require('express-messages')(request, response);
  next();
});


app.get('*', function(request, response, next) {
  response.locals.user = request.user || null;

  if (request.user) {
    response.locals.type = request.user.type;
  }
  next();
});


app.use('/', routes);
app.use('/', users);
app.use('/students', students);
app.use('/teachers', teachers);
app.use('/lectures', lectures);

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
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
