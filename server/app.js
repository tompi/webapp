
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var passport = require('passport');
var auth = require('./auth');
var config = require('./config');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '../build/client');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.cookieParser() );
  app.use(express.session({secret: config.sessionSecret}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.compress());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, '../build/client')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


var mongo = require('./mongo.js');
var mers = require('mers');
var mc = config.mongodb;
var dbUri = process.env.MONGOHQ_URL;
if (!dbUri) dbUri = 'mongodb://' + mc.user + ':' + mc.password + '@' + mc.host + '/' + mc.db;

app.use('/api/v1', mers({ uri: dbUri }).rest());

var userService = require('./userService')(app.locals.mers.conn);
auth.init(app, config, passport, userService);

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io = require('socket.io').listen(server);

mongo.on('newTodo', function(todo) {
    io.sockets.emit('newTodo', todo);
});

var backgrounds = require('./backgrounds');
backgrounds.init(app);

