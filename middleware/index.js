"use strict";

var moduleName = __filename;
var cors = require('cors');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var fs = require('fs');
var path = require('path'); 
var config = require("config");

var corsOptions = require('config/cors.js').corsOptions;
var morganOptions = require('./RequestLogMiddleware.js').morganOptions;
var authorization = require('./Authentication.js').authorization;
//var hasPrivilege = require('./PrivilegeValidator.js').hasPrivilege;
//var unique = require('helper').uniqueIdGenerator;
//var localCache = require('service/cache').local;
var messages = config.messages;
var responseCodes = config.responseCodes;
var responseController = require("controller/ResponseController.js");
var logger = require('helper/Logger.js')(moduleName);

module.exports = function(app){	
	
	app.use(function(req,res,next){
		req.data = {};
		next();
	});
	app.use(cors(corsOptions));
	app.use(morgan(morganOptions.format, morganOptions.options));
	
	app.use(bodyParser.json());
	
	app.use(bodyParser.urlencoded({extended:true}));
	
	app.use(function(err, req, res, next){
			logger.error("Error got here"+err);
			return responseController(messages.internalServerError, responseCodes.BAD_REQUEST, null, res);			
	});

	/*
		req.reqId
	 	req.data.reqId
	*/
	/*app.use(function(req, res, next){
		var id = unique.get();
		req.reqId = id;
		req.data.reqId = id;
		var cacheObject = {};
		localCache.put(id, cacheObject);

		res.on('finish', function(){
			localCache.del(id);
		});

		next();
	});
*/
	var apiWithoutAuthorization = [
		new RegExp('\/v1\/security\/login', 'i'),
		new RegExp('\/v1\/security\/signup', 'i')
	];

	/*
		req.data.user
	 	localCache.session
	 	localCache.session.token
	*/
	app.use(authorization().unless({path : apiWithoutAuthorization}));

	//app.use(hasPrivilege().unless({path : ['/v1/security/token','/v1/security/Token','/dev/']}));
};
