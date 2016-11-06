"use strict";

var moduleName = __filename;
var logger = require('helper/Logger.js')(moduleName);
var config = require('config');
var responseCodes = config.responseCode;
var messages = config.messages;
var priceDao = new (require('dao/admin/PriceDao.js'))();
var PriceService = function () { };

/*********************************Get List Start************************************************/
PriceService.prototype.getTestPrice = function (modal, cb) {
    logger.info("Get test price service called (getTestPrice())");
    var self = this;

    priceDao.getTestPrice(modal, function (err, result) {
        if (err) {
            logger.error("Error in get item price (getTestPrice()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }
        if(result && result.length>0 ){
            return cb(null,responseCodes.SUCCESS, result[0].price);
        }else{
            return cb(messages.testPriceNotAvailable, responseCodes.BAD_REQUEST);
        }
    });
};
/*********************************Get List End************************************************/


module.exports = PriceService;
