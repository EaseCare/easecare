"use strict";

var moduleName = __filename;
var config = require('config');
var sharedCache = require('service/cache/').shared;
var responseController = require('controller/ResponseController.js');
var logger = require("helper/Logger.js")(moduleName);
var localCache = require('service/cache').local;

var JwtService = require('service/security/JwtService.js');
var jwtService = new JwtService();
var LoginService = require('service/security/AuthenticationService.js');
var loginService = new LoginService();

var constants = config.orionConstants;
var messages = config.messages;
var responseCodes = config.responseCodes;

function unthorisedResponse(res, msg){
	return responseController(msg, responseCodes.UNAUTHORIZED, null, res);
}

/*
 * will always run with eclipse token in headers 
*/
exports.authorization = function() {
	var isAuthorized = function(req, res, next) {
		logger.info("Verify authorization (isAuthorized())");
		
		var authorizationHeaders = req.headers.authorization;
			console.log("headers ra"+JSON.stringify(authorizationHeaders));
		if (authorizationHeaders) {
			var authorization = authorizationHeaders.split(' ');
			if(authorization[0] === 'Session'){
				var token = authorization[1];
				if (token) {
					req.data.token = token;
					jwtService.verify(token, function(err, decoded) {
						if (err) {
							logger.error("Error in isAuthorized (isAuthorized())" + err);
							return unthorisedResponse(res, messages.invalidHeaders);
						} else {
							/*var cacheObject = localCache.get(req.data.reqId);
							cacheObject.session = decoded;
							decoded.token = token;
							req.data.user = {userId: decoded.actualUserId, firmId: decoded.firmId };*/
							sharedCache.get(token,  function(err, data){
								if(err || !data){
									logger.error("Error in isAuthorized (isAuthorized())" + err);
									return unthorisedResponse(res, messages.notLoggedIn);
								}else{
									req.body.loggedInUser = JSON.parse(data); 
									logger.info("Authorization successful (isAuthorized())");
									return next();
								}
							});;
						}
					});
				}else{
					logger.info("Authorization failed (isAuthorized())");
					return unthorisedResponse(res, messages.invalidHeaders);
				}
			}else{
				logger.info("Authorization failed (isAuthorized())");
				return unthorisedResponse(res, messages.invalidHeaders);
			}
		}else{
			logger.info("Authorization failed (isAuthorized())");
			return unthorisedResponse(res, messages.invalidHeaders);
		}

		//if(!isTokenValid){
		//	return unthorisedResponse(res, messages.invalidHeaders);
		//}

	};

	isAuthorized.unless = require("express-unless");
	return isAuthorized;
};

