"use strict";

var moduleName = __filename;
var config = require('config');
var sharedCache = require('service/cache').shared;
var responseController = require('controller/ResponseController.js');
var logger = require("helper/Logger.js")(moduleName);

var messages = config.messages;
var responseCodes = config.responseCodes;
var constants = config.orionConstants;

function unauthorisedResponse(res, msg) {
	var key = "{\"" + constants.ERROR_MESSAGE_KEY + "\":\"" + msg + "\"}";
	responseController(null, responseCodes.UNAUTHORIZED, JSON.parse(key), res);
	//res.status(responseCodes.UNAUTHORIZED).send({status:res.statusCode , message : msg});
}

exports.hasPrivilege = function () {
    var isAuthorized = function (req, res, next) {
        logger.info("Has privilege called (hasPrivilege())");
        var hasPrivilege = false;
        var token = req.data.token;
        var isTokenFound = true;
        sharedCache.get(token, function (err, data) {
            if (!!data) {
                var userLoggedIn;
                try {
                    userLoggedIn = JSON.parse(data);
                } catch(err){
                    logger.error("Has privilege failed (hasPrivilege()) " + err);
                    return unauthorisedResponse(res, messages.unauthorized);    
                }
                var privilegeMap = userLoggedIn.privileges;
                var privSize = Object.keys(privilegeMap).length;
                if (privilegeMap && privSize > 0) {
                    var modules = req.url.split("/");
                    var moduleToAccess = modules[2].toLowerCase();
                    if(moduleToAccess === "preferences"){
                        //do somthing
                    }else{
                        moduleToAccess = modules[3].toLowerCase();
                    }
                    var reqMethod = req.method;
                    var permissionNeedFor = constants.methodParse[reqMethod];
                    if (moduleToAccess in privilegeMap) {
                        var privilege = privilegeMap[moduleToAccess];
                        if (privilege[permissionNeedFor]) {
                            return next();
                        }
                        else {
                            logger.info("Unauthorized response " + err);
                            return unauthorisedResponse(res, messages.unauthorized);
                        }
                    } else {
                        
                        if(moduleToAccess === "preferences"){
                            logger.info("not found it may be pref case");
                        }
                        //get pref level and repeat above
                        return next();
                    }
                } else {
                    return unauthorisedResponse(res, messages.unauthorized);
                }
            } else {
                return unauthorisedResponse(res, messages.notLoggedIn);
            }
        });

    };

    isAuthorized.unless = require("express-unless");
    return isAuthorized;
};
