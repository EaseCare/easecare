"use strict";

var moduleName = __filename;
var logger = require('helper/Logger.js')(moduleName);
var config = require('config');
var responseCodes = config.responseCode;
var messages = config.messages;
var paymentDao = new (require('dao/admin/PaymentDao.js'))();
var PaymentService = function () { };

/*********************************Get List Start************************************************/
PaymentService.prototype.getList = function (modal, cb) {
    logger.info("Payment get list service called (getList())");
    var self = this;

    paymentDao.getList(modal, function (err, entities) {
        if (err) {
            logger.error("Error in get payment list (getList()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }
        return cb(null, responseCodes.SUCCESS, entities);
    });
};
/*********************************Get List End************************************************/

PaymentService.prototype.createOrderPayment = function (modal, cb) {
    logger.info("createOrderPayment service called (createOrderPayment())");
    var self = this;
 
    paymentDao.createOrderPayment(modal, function(err,result){
        if (err) {
            logger.error("Error in create order payment (createOrderPayment()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }
        self.createOrderAddress(modal,function(err,status,result){
            if(err){
                return cb(err,status);
            }
           return cb(null, responseCodes.SUCCESS, {"message":messages.orderPaymentSuccess}); 
        });
    });
}

PaymentService.prototype.createOrderAddress = function (modal, cb) {
    logger.info("createOrderAddress service called (createOrderAddress())");
    var self = this;
 
    paymentDao.createOrderAddress(modal, function(err,result){
        if (err) {
            logger.error("Error in create order address (createOrderAddress()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }
        return cb(null, responseCodes.SUCCESS, result);
    });
}

module.exports = PaymentService;
