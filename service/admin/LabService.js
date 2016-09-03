"use strict";

var moduleName = __filename;
var logger = require('helper/Logger.js')(moduleName);
var config = require('config');
var responseCodes = config.responseCode;
var messages = config.messages;
var labDao = new (require('dao/admin/LabDao.js'))();
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


/*********************************Get Detail Start************************************************/
LabService.prototype.getDetail = function (data, cb) {
    logger.info("Lab get detail service called (getDetail())");
    var self = this;

    labDao.getDetail(data, function (err, entities) {
        if (err) {
            logger.error("Error in get lab detail (getDetail()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }

        return cb(null, responseCodes.SUCCESS, entities);
    });
};
/*********************************Get Detail End************************************************/


/*********************************Add Start************************************************/
LabService.prototype.add = function (data, cb) {
    logger.info("Lab add service called (add())");
    var self = this;

    logger.debug(" lab add data is (add())" + JSON.stringify(data));
    labDao.add(data, function (err, addLabresult) {
        if (err) {
            logger.error("Error in add lab (add()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }

        var labLoginData = {
            lab_id: addLabresult.insertId,
            email: data.email,
            password: data.password,
            mobile_number: data.mobile_number
        };
        logger.debug(" lab login data is (add())" + JSON.stringify(labLoginData));
        labDao.addLabLogin(labLoginData, function (err, addLabLoginResult) {
            if (err) {
                logger.error("Error in add lab login (add()) " + err);
                return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
            }

            var labDetailData = {
                id: addLabresult.insertId
            };
            logger.debug(" lab detail data is (add())" + JSON.stringify(labDetailData));
            self.getDetail(labDetailData, function (err, code, getLabDetailResult) {
                return cb(err, code, getLabDetailResult);
            });
        });
    });
};
/*********************************Add End************************************************/


module.exports = LabService;
