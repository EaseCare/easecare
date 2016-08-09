"use strict";

var moduleName = __filename;
var logger = require('helper/Logger.js')(moduleName);
var config = require('config');
var responseCodes = config.responseCode;
var messages = config.messages;
var userDao = new (require('dao/admin/UserDao.js'))();
var UserService = function () { };

/*********************************Get List Start************************************************/
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
};
/*********************************Get List End************************************************/


/*********************************Get Detail Start************************************************/
UserService.prototype.getDetail = function (data, cb) {
    logger.info("User get detail service called (getDetail())");
    var self = this;

    userDao.getDetail(data, function (err, entities) {
        if (err) {
            logger.error("Error in get user detail (getDetail()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }

        return cb(null, responseCodes.SUCCESS, entities);
    });
};
/*********************************Get Detail End************************************************/


/*********************************Add Start************************************************/
UserService.prototype.add = function (data, cb) {
    logger.info("User add service called (add())");
    var self = this;

    logger.debug(" user add data is (add())" + JSON.stringify(data));
    userDao.add(data, function (err, addUserresult) {
        if (err) {
            logger.error("Error in add user (add()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }

        var userLoginData = {
            user_id: addUserresult.insertId,
            email: data.email,
            password: data.password,
            mobile_number: data.mobile_number
        };
        logger.debug(" user login data is (add())" + JSON.stringify(userLoginData));
        userDao.addUserLogin(userLoginData, function (err, addUserLoginResult) {
            if (err) {
                logger.error("Error in add user login (add()) " + err);
                return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
            }

            var userDetailData = {
                id: addUserresult.insertId
            };
            logger.debug(" user detail data is (add())" + JSON.stringify(userDetailData));
            self.getDetail(userDetailData, function (err, code, getUserDetailResult) {
                return cb(err, code, getUserDetailResult);
            });
        });
    });
};
/*********************************Add End************************************************/


module.exports = UserService;
