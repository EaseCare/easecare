"use strict";

var moduleName = __filename;
var logger = require('helper/Logger.js')(moduleName);

var config = require('config');
var jwtService = new (require('service/security/JwtService.js'))();
var constants = config.constants;
var responseCodes = config.responseCode;


var TokenService = function() {}

TokenService.prototype.generateToken = function (entity, cb) {
 	logger.info("Generate token service called (generateToken())"+entity[0].user_id);
	 
	var dataToToken = constants.token();
	dataToToken.user_id = entity[0].user_id;

	jwtService.sign(dataToToken, function (err, token) {
		if (err) {
			logger.error("Error in signing token (generateToken())" + err);
			return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
		}else{
			return cb(null, responseCodes.SUCCESS, token);
		}
	});
};

module.exports = TokenService;