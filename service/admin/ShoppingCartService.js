"use strict";
var lodash = require("lodash");
var moduleName = __filename;
var logger = require('helper/Logger.js')(moduleName);
var config = require('config');
var responseCodes = config.responseCode;
var messages = config.messages;
var shoppingCartDao = new (require('dao/admin/ShoppingCartDao.js'))();
var utilService = new (require('service/util/UtilService.js'))();
var ShoppingCartService = function () { };

/*********************************Get List Start************************************************/
ShoppingCartService.prototype.getList = function (modal, cb) {
    logger.info("ShoppingCart get list service called (getList())");
    var self = this;

    shoppingCartDao.getList(modal, function (err, entities) {
        if (err) {
            logger.error("Error in get shoppingCart list (getList()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }
        var resultCart = [];
        if (entities && entities.length > 0) {
            var responseObject = self.getCartResponseObject(entities);
            return cb(null, responseCodes.SUCCESS, responseObject);
        } else {
            return cb(null, responseCodes.SUCCESS, []);
        }
    });
};
/*********************************Get List End************************************************/

/*********************************Add Start************************************************/
ShoppingCartService.prototype.add = function (modal, cb) {
    logger.info("ShoppingCart add service called (add())");
    var self = this;
    var appointment_date = modal.appointment_date;
    modal.appointment_date = utilService.formatDateTime(appointment_date);
    shoppingCartDao.add(modal, function (err, result) {
        if (err) {
            logger.error("Error in add shoppingCart (add()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }
        shoppingCartDao.getCartOrder(modal, function (err, result) {
            if (err) {
                logger.error("Error in get cart order(add()) " + err);
                return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
            }
            if (result && result.length > 0) {
                self.getList(modal, function (err, code, output) {
                    return cb(err, code, output);
                });
            } else {
                shoppingCartDao.createCartOrder(modal, function (err, result) {
                    if (err) {
                        logger.error("Error in create get cart order(add()) " + err);
                        return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
                    }
                    self.getList(modal, function (err, code, output) {
                        return cb(err, code, output);
                    });
                });
            }
        });
    });
};
/*********************************Add End************************************************/

ShoppingCartService.prototype.getCartResponseObject = function (entities) {
    var responseList = [];
    var order_id = entities[0].order_id;
    entities.forEach(function (entity) {
        var responseObject = {};
        var labData = {};
        var testData = {};
        var address = {};
        var topReview = {};
        testData.id = entity.test_id;
        testData.name = entity.test_name;
        testData.created_date = entity.cart_date;

        address.line1 = entity.address_line_1;
        address.line2 = entity.address_line_2;
        address.city = entity.city;
        address.state = entity.state;
        address.latitude = entity.latitude;
        address.logitude = entity.longitude;

        topReview.text = entity.review;
        topReview.created_date = entity.r_created_date;
        topReview.user_image = entity.r_user_image;
        topReview.last_name = entity.r_user_last_name;
        topReview.first_name = entity.r_user_first_name;
        topReview.user_id = entity.r_user_id;

        labData.id = entity.lab_id;
        labData.name = entity.lab_name;
        labData.price = entity.test_price;
        labData.image = entity.lab_image;
        labData.address = address;
        labData.top_review = topReview;

        responseObject.testData = testData;
        responseObject.labData = labData;
        responseList.push(responseObject);
    });
    var cart = {};
    cart.order_id = order_id;
    cart.order_items = responseList;
    return cart;
}
ShoppingCartService.prototype.removeUserCart = function(modal,cb){
    logger.info("ShoppingCart remove cart service called (removeUserCart())");
    shoppingCartDao.removeUserCart(modal, function (err, result) {
        if (err) {
            logger.error("Error in remove shoppingCart (removeUserCart()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }
        return cb(null,responseCodes.SUCCESS,{message:messages.cartRemove});
    });
}
module.exports = ShoppingCartService;
