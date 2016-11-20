"use strict";


require('app-module-path').addPath(__dirname);
var express = require('express');
var app = express();
var socket = require("socket.io");
var path = require("path");


var moduleName = __filename;
var logger = require('helper/Logger.js')(moduleName);

var config = require("config");
var PORT = config.env.prop.port;


//app.use('/doc', express.static(path.join(__dirname, 'doc')));
app.use('/reports', express.static(path.join(__dirname, 'test_reports')));

require('middleware')(app);
require('controller')(app);

var io = null;

var startServer = function (app) {
	logger.info('Server Started at ' + PORT || 3001);
	io = socket.listen(app.listen(PORT || 3001));
};

startServer(app);

if(!!io){
	require('middleware/SocketsMiddleware.js')(io);
	require('controller/socket')(io);
}

//process.on('uncaughtException', function (err) {
//	logger.error("Got exception but handeled gracefully", err);
//});
