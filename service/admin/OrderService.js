"use strict";

var moduleName = __filename;
var logger = require('helper/Logger.js')(moduleName);
var config = require('config');
var responseCodes = config.responseCode;
var messages = config.messages;
var orderDao = new (require('dao/admin/OrderDao.js'))();
var paymentService = new (require('service/admin/PaymentService.js'))();
var utilService = new (require('service/util/UtilService.js'))();
var OrderService = function () { };

/*********************************Get List Start************************************************/
OrderService.prototype.add = function (modal, cb) {
    logger.info("Category get list service called (getList())");
    var self = this;
    var appointment_date = modal.appointment_date;
    modal.appointment_date = utilService.formatDateTime(appointment_date);
    orderDao.add(modal, function (err, result) {
        if (err) {
            logger.error("Error in get category list (getList()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }
        modal.order_id = result.insertId;
        paymentService.createOrderPayment(modal, function(err,status, result){
            if(err){
                return cb(err,status);
            }
            return cb(null, responseCodes.SUCCESS, {"message":messages.orderPaymentSuccess}); 
        });
    });
};
/*********************************Get List End************************************************/




module.exports = OrderService;
