"use strict";

var moduleName = __filename;
var logger = require('helper/Logger.js')(moduleName);

var config = require('config');
var responseCodes = config.responseCode;
var messages = config.messages;

var userDao = new (require('dao/admin/UserDao.js'))();

var UserService = function () { };

UserService.prototype.getList = function (modal, cb) {
    logger.info("User get list service called (getList())");
    var self = this;

    userDao.getList(modal, function (err, entities) {
        if (err) {
            logger.error("Error in get user list (getList()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }

        return cb(null, responseCodes.SUCCESS, entities);
    });
}
UserService.prototype.add = function (modal, cb) {
    logger.info("User add service called (add())");
    var self = this;

    userDao.add(modal, function (err, entities) {
        if (err) {
            logger.error("Error in add user (add()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }

        return cb(null, responseCodes.SUCCESS, entities);
    });
}
module.exports = UserService;
