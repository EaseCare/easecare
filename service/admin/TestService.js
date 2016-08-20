"use strict";

var moduleName = __filename;
var logger = require('helper/Logger.js')(moduleName);
var config = require('config');
var responseCodes = config.responseCode;
var messages = config.messages;
var testDao = new (require('dao/admin/TestDao.js'))();
var TestService = function () { };

/*********************************Get List Start************************************************/
TestService.prototype.getList = function (modal, cb) {
    logger.info("Test get list service called (getList())");
    var self = this;

    testDao.getList(modal, function (err, entities) {
        if (err) {
            logger.error("Error in get test list (getList()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }

        return cb(null, responseCodes.SUCCESS, entities);
    });
};
/*********************************Get List End************************************************/


/*********************************Get Detail Start************************************************/
TestService.prototype.getDetail = function (data, cb) {
    logger.info("Test get detail service called (getDetail())");
    var self = this;

    testDao.getDetail(data, function (err, entities) {
        if (err) {
            logger.error("Error in get test detail (getDetail()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }

        return cb(null, responseCodes.SUCCESS, entities);
    });
};
/*********************************Get Detail End************************************************/


/*********************************Add Start************************************************/
TestService.prototype.add = function (data, cb) {
    logger.info("Test add service called (add())");
    var self = this;

    logger.debug(" test add data is (add())" + JSON.stringify(data));
    testDao.add(data, function (err, addTestresult) {
        if (err) {
            logger.error("Error in add test (add()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }

        var testLoginData = {
            test_id: addTestresult.insertId,
            email: data.email,
            password: data.password,
            mobile_number: data.mobile_number
        };
        logger.debug(" test login data is (add())" + JSON.stringify(testLoginData));
        testDao.addTestLogin(testLoginData, function (err, addTestLoginResult) {
            if (err) {
                logger.error("Error in add test login (add()) " + err);
                return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
            }

            var testDetailData = {
                id: addTestresult.insertId
            };
            logger.debug(" test detail data is (add())" + JSON.stringify(testDetailData));
            self.getDetail(testDetailData, function (err, code, getTestDetailResult) {
                return cb(err, code, getTestDetailResult);
            });
        });
    });
};
/*********************************Add End************************************************/


module.exports = TestService;
