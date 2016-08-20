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


/*********************************Get Detail Start************************************************/
CategoryService.prototype.getDetail = function (data, cb) {
    logger.info("Category get detail service called (getDetail())");
    var self = this;

    categoryDao.getDetail(data, function (err, entities) {
        if (err) {
            logger.error("Error in get category detail (getDetail()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }

        return cb(null, responseCodes.SUCCESS, entities);
    });
};
/*********************************Get Detail End************************************************/


/*********************************Add Start************************************************/
CategoryService.prototype.add = function (data, cb) {
    logger.info("Category add service called (add())");
    var self = this;

    logger.debug(" category add data is (add())" + JSON.stringify(data));
    categoryDao.add(data, function (err, addCategoryresult) {
        if (err) {
            logger.error("Error in add category (add()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }

        var categoryLoginData = {
            category_id: addCategoryresult.insertId,
            email: data.email,
            password: data.password,
            mobile_number: data.mobile_number
        };
        logger.debug(" category login data is (add())" + JSON.stringify(categoryLoginData));
        categoryDao.addCategoryLogin(categoryLoginData, function (err, addCategoryLoginResult) {
            if (err) {
                logger.error("Error in add category login (add()) " + err);
                return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
            }

            var categoryDetailData = {
                id: addCategoryresult.insertId
            };
            logger.debug(" category detail data is (add())" + JSON.stringify(categoryDetailData));
            self.getDetail(categoryDetailData, function (err, code, getCategoryDetailResult) {
                return cb(err, code, getCategoryDetailResult);
            });
        });
    });
};
/*********************************Add End************************************************/


module.exports = CategoryService;
