"use strict";

var moduleName = __filename;
var logger = require('helper/Logger.js')(moduleName);

var config = require('config');
var responseCodes = config.responseCode;
var messages = config.messages;
var constants = config.constants;
var sharedCache = require('service/cache').shared;
var authenticationDao = new (require('dao/security/AuthenticationDao.js'))();
var tokenService = new (require('service/security/TokenService.js'))();


var AuthenticationService = function () { };

AuthenticationService.prototype.logIn = function (modal, cb) {
	logger.info("Login service called (logIn())");
	var self = this;

	authenticationDao.logIn(modal, function (err, entity) {
		if (err) {
			logger.error("Error in authentication (logIn()) " + err);
			return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
		}
		if (entity && entity.length > 0) {
			//genrate token and return it as well
			tokenService.generateToken(entity, function (err, code, token) {
				if (err) {
					logger.error("Error in JWT token generation (logIn()) " + err);
					return cb(err, code);
				} else {
					logger.info("JWT token generated successfully (logIn())");
					var expire_time = parseInt(constants.token().exp);
					sharedCache.put(token, JSON.stringify(entity[0]), function (err, data) {
						
						if (err) {
							logger.error(err);
							return cb(messages.internalServerError, responseCodes.INTERNAL_SERVER_ERROR);
						} else {
							logger.debug("Data put into shared cache" + data);
							return cb(null, code, { id:entity[0].user_id,token: token });
						}
					}, expire_time);
				}
			});
		} else {
			return cb(messages.wrongCredentials, responseCodes.UNAUTHORIZED);
		}
	});
}
module.exports = AuthenticationService;
