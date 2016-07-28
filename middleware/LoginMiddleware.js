"use strict";

var moduleName = __filename;
var config = require('config');
var localCache = require('service/cache').local;
var sharedCache = require('service/cache/').shared;
var response = require('controller/ResponseController.js');

var logger = require('helper/Logger.js')(moduleName);
var unique = require('helper').uniqueIdGenerator;
var constants = config.constants;
var messages = config.messages;
var middlewareUtils = require('helper').middlewareUtils;
var responseCodes = config.responseCodes;

var loginReqCleanup = function(reqId, cacheObject){
    logger.info("Login cache cleanup middleware called (loginReqCleanup())");
	var connection = cacheObject.connection;
	if(!!connection){
		connection.release();
	}
	if(!!cacheObject.common){
		cacheObject.common.release();
	}
	localCache.del(reqId);	
    logger.info("Login cache cleanup middleware completed (loginReqCleanup())");
}

module.exports.login = function(req, res, next){
    logger.info("Login middleware called (login())");
    var reqId = req.data.reqId;
    var cacheObject = localCache.get(reqId);

    res.on('finish', function (){
    	loginReqCleanup(reqId, cacheObject);
    });
    
    res.on('close', function (){
    	loginReqCleanup(reqId, cacheObject);
    });
    middlewareUtils.associateDBCommonConnectionWithReq(req, res, function(err, connection){
        if(err) {
            logger.error("Error in login middleware (login())" + err);
            return response(messages.internalServerError, responseCodes.INTERNAL_SERVER_ERROR, null, res);
        }
        next();
    });
};

module.exports.logout = function(req, res, next){
    logger.info('Logout middleware function called (logout())');
    var token = req.data.token;
    if(token){
        sharedCache.del(token, function(err, reply){
            if(err){
            	logger.error("Error in Logout middleware function (logout())"+ err);
            	var key = "{\""+constants.ERROR_MESSAGE_KEY+"\":\""+messages.internalServerError+"\"}";
                return response(JSON.parse(key), responseCodes.INTERNAL_SERVER_ERROR, null, res);
            }else{
                 logger.info('Deleted token on logout', reply);
            }             
        }); 
    }
    next();
};