"use strict";

var moduleName = __filename;
var logger = require('helper/Logger.js')(moduleName);
var config = require('config');
var responseCodes = config.responseCode;
var messages = config.messages;
var categoryDao = new (require('dao/admin/CategoryDao.js'))();
var CategoryService = function () { };

/*********************************Get List Start************************************************/
CategoryService.prototype.getList = function (modal, cb) {
    logger.info("Category get list service called (getList())");
    var self = this;

    categoryDao.getList(modal, function (err, entities) {
        if (err) {
            logger.error("Error in get category list (getList()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }

        return cb(null, responseCodes.SUCCESS, entities);
    });
};
/*********************************Get List End************************************************/




module.exports = CategoryService;
