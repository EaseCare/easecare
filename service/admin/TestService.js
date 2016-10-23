"use strict";

var moduleName = __filename;
var logger = require('helper/Logger.js')(moduleName);
var config = require('config');
var responseCodes = config.responseCode;
var messages = config.messages;
var testDao = new (require('dao/admin/TestDao.js'))();
var testResponser = new (require('responser/TestResponser.js'))();
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


/*********************************Get Sub Test List Start************************************************/
TestService.prototype.getSubList = function (modal, cb) {
    logger.info("Test get list service called (getList())");
    var self = this;

    testDao.getSubList(modal, function (err, entities) {
        if (err) {
            logger.error("Error in get test list (getList()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }

        return cb(null, responseCodes.SUCCESS, entities);
    });
};
/*********************************Get Sub Test List End************************************************/

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

TestService.prototype.getTraceTest = function(data, cb){
     logger.info(" Test trace service called (getTraceTest())");
    var self = this;

    testDao.getTraceTest(data, function (err, entities) {
        if (err) {
            logger.error("Error in get trace test (getTraceTest()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }
        var traceTestResponse = testResponser.getTraceTestResponse(entities);
        return cb(null, responseCodes.SUCCESS, traceTestResponse);
    });
}

TestService.prototype.getTestLabs = function (data, cb) {
    logger.info(" Test Lab get list service called (getTestLabs())");
    var self = this;

    testDao.getTestLabs(data, function (err, entities) {
        if (err) {
            logger.error("Error in get test lab list (getTestLabs()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }
        var getTestLabResponse = testResponser.getListResponse(entities);
        return cb(null, responseCodes.SUCCESS, getTestLabResponse);
    });
}
module.exports = TestService;
