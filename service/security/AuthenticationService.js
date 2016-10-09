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
var userService = new (require('service/admin/UserService.js'))();

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
AuthenticationService.prototype.changePassword = function(data, cb){
	logger.info("Authentication service  called (changePassword())");
	var self = this;
	userService.isUserExist(data,function(err,status,userExist){
		if(err){
			logger.error("Error in isUserExist service (changePassword()) " + err);
			return cb(err, status);
		}
		if(userExist){
			data.password = data.old_password;
			self.isValidPassword(data,function(err, status, passwordFound){
				if(err){
					logger.error("Error in isValidPassword service (changePassword()) " + err);
					return cb(err, status);
				}
				if(passwordFound){
					authenticationDao.changePassword(data, function (err, entity) {
						if (err) {
							logger.error("Error in authentication service (changePassword()) " + err);
							return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
						}
						logger.debug("Password Change Successfully");
						return cb(null, responseCodes.SUCCESS, { messages:"Password change successfully." });
					});
				}else{
					logger.debug("old password is not valid (changePassword())");
					return cb(null,responseCodes.BAD_REQUEST, {messages:"Old Password is not valid"})
				}
			});
		}else{
			logger.debug("user not found (changePassword())");
			return cb(null,responseCodes.NOT_FOUND, {messages:"User Not Found"})
		}
	});
}
AuthenticationService.prototype.isValidPassword = function(data, cb){
	logger.info("Authentication service  called (isValidPassword())");
	authenticationDao.isValidPassword(data, function (err, entity) {
		if (err) {
			logger.error("Error in authentication service (isValidPassword()) " + err);
			return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
		}
		if(entity && entity.length > 0 ){
			logger.debug("Password Found Successfully");
			return cb(null, responseCodes.SUCCESS, true);
		}else{
			logger.debug("Password Not Found");
			return cb(null, responseCodes.SUCCESS, false);
		}	
	});
}
module.exports = AuthenticationService;
