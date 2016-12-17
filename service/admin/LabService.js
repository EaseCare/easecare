"use strict";

var moduleName = __filename;
var logger = require('helper/Logger.js')(moduleName);
var config = require('config');
var responseCodes = config.responseCode;
var messages = config.messages;
var labDao = new (require('dao/admin/LabDao.js'))();
var labResponser = new (require('responser/LabResponser.js'))();
var LabService = function () { };

/*********************************Get List Start************************************************/
LabService.prototype.getList = function (modal, cb) {
    logger.info("Lab get list service called (getList())");
    var self = this;

    labDao.getList(modal, function (err, entities) {
        if (err) {
            logger.error("Error in get lab list (getList()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }
        
        return cb(null, responseCodes.SUCCESS, entities);
    });
};
/*********************************Get List End************************************************/

/*********************************Get List For Test Start************************************************/
LabService.prototype.getListForTest = function (modal, cb) {
    logger.info("Lab get list for test service called (getListForTest())");
    var self = this;

    labDao.getListForTest(modal, function (err, entities) {
        if (err) {
            logger.error("Error in get lab list for test (getListForTest()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }
        if(entities && entities.length>0){
            var listForTestResponse = labResponser.getListForTestResponse(entities);
            return cb(null, responseCodes.SUCCESS, listForTestResponse);
        }else{
            return cb(null, responseCodes.SUCCESS, []);
        }
    });
};
/*********************************Get List For Test End************************************************/

module.exports = LabService;
