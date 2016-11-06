"use strict";

var moduleName = __filename;
var logger = require('helper/Logger.js')(moduleName);
var config = require('config');
var responseCodes = config.responseCode;
var messages = config.messages;
var organizationDao = new (require('dao/admin/OrganizationDao.js'))();
var OrganizationService = function () { };

/*********************************Get List Start************************************************/
OrganizationService.prototype.get = function (modal, cb) {
    logger.info("Organization get service called (get())");
    var self = this;

    organizationDao.get(modal, function (err, entities) {
        if (err) {
            logger.error("Error in get organization (get()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }
        
        return cb(null, responseCodes.SUCCESS, entities);
    });
};
/*********************************Get List End************************************************/


module.exports = OrganizationService;
