"use strict";

var moduleName = __filename;
var logger = require('helper/Logger.js')(moduleName);
var config = require('config');
var responseCodes = config.responseCode;
var messages = config.messages;
var offerDao = new (require('dao/admin/OfferDao.js'))();
var OfferService = function () { };

/*********************************Get List Start************************************************/
OfferService.prototype.getList = function (modal, cb) {
    logger.info("Offer get list service called (getList())");
    var self = this;

    offerDao.getList(modal, function (err, entities) {
        if (err) {
            logger.error("Error in get offer list (getList()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }
        
        return cb(null, responseCodes.SUCCESS, entities);
    });
};
/*********************************Get List End************************************************/


module.exports = OfferService;
