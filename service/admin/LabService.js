"use strict";

var moduleName = __filename;
var logger = require('helper/Logger.js')(moduleName);
var config = require('config');
var responseCodes = config.responseCode;
var messages = config.messages;
var labDao = new (require('dao/admin/LabDao.js'))();
var labResponser = new (require('responser/LabResponser.js'))();
var utilService = new (require('service/util/UtilService.js'))();
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
LabService.prototype.getLabReviews = function(modal, cb){
    logger.info("Lab get reviews service called (getLabReviews())");
    var self = this;

    labDao.getLabReviews(modal, function (err, entities) {
        if (err) {
            logger.error("Error in get lab reviews list (getLabReviews()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }
        if(entities && entities.length>0){
            var result = self.prepareReviewResponse(entities);
            return cb(null, responseCodes.SUCCESS, result);
        }else{
            return cb(messages.labNotFound, responseCodes.NOT_FOUND);   
        }
    });
}
LabService.prototype.prepareReviewResponse = function(inputData){
    var resultList = [];
    inputData.forEach(function(data){
        var resultObject = {};
        resultObject.name = data.name;
        resultObject.rating = data.rating;
        resultObject.review = data.review;
        resultObject.created_date = data.created_date;
        var user = {};
        user.id = data.id;
        user.first_name = data.first_name;
        user.last_name = data.last_name;
        resultObject.user = user;
        resultList.push(resultObject);
    });
    return resultList;
}
/*********************************Get List For Test Start************************************************/
LabService.prototype.getListForTest = function (modal, cb) {
    logger.info("Lab get list for test service called (getListForTest())");
    var self = this;
    var tests = [];
    if(modal.test_ids){
        tests = modal.test_ids.split(",");
    }
    utilService.getDuplicate(tests, function(keys, out_map){
        modal.tests = keys;
        labDao.getListForTest(modal, function (err, entities) {
            if (err) {
                logger.error("Error in get lab list for test (getListForTest()) " + err);
                return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
            }
            if(entities && entities.length>0){
                var listForTestResponse = labResponser.getListForTestResponse(entities, out_map);
                var sortedResponse = utilService.sortArrayOnValue(listForTestResponse, "total_price");
                return cb(null, responseCodes.SUCCESS, sortedResponse);
            }else{
                return cb(null, responseCodes.SUCCESS, []);
            }
        });
    })
};
/*********************************Get List For Test End************************************************/

module.exports = LabService;
