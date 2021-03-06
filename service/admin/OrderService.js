"use strict";

var moduleName = __filename;
var logger = require('helper/Logger.js')(moduleName);
var config = require('config');
var responseCodes = config.responseCode;
var messages = config.messages;
var orderDao = new (require('dao/admin/OrderDao.js'))();


var orderItemService = new (require('service/admin/OrderItemService.js'))();
var utilService = new (require('service/util/UtilService.js'))();
var paymentService = new (require('service/admin/PaymentService.js'))();
var offerService = new (require('service/admin/OfferService.js'))();

var OrderService = function () { };

/*********************************Get List Start************************************************/
OrderService.prototype.add = function (modal, cb) {
    logger.info("Add order service called (add())");
    var self = this;
    var appointment_date = modal.appointment_date;
    modal.appointment_date = utilService.formatDateTime(appointment_date);
    orderDao.add(modal, function (err, result) {
        if (err) {
            logger.error("Error in add order (add()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }
        modal.order_id = result.insertId;
        
            orderItemService.add(modal, function(err,status,result){
                if(err){
                    logger.error("error adding order item (add())"+err);
                    return cb(err,status);
                }
                return cb(null, responseCodes.SUCCESS, {"order_id":modal.order_id}); 
            });  
    });
};

OrderService.prototype.applyCouponAndPayment = function(modal, cb){
    logger.info("Apply coupen and payment service called (applyCouponAndPayment())");
    var self = this;
    if(modal.id){
        modal.total_price = modal.amount;
        offerService.applyCoupon(modal, function(err, status, offerResult){
            if(err){
                logger.error("Error in apply coupen codes (applyCouponAndPayment()) " + err);
                return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
            }
            modal.offer_id = modal.id;
            modal.amount = offerResult.new_price;
            paymentService.createDirectOrderPayment(modal, function(err,status, result){
                if(err){
                    logger.error("error adding order payment (applyCouponAndPayment())"+err);
                    return cb(err,status);
                }
                return cb(null, responseCodes.SUCCESS, {"message":messages.orderPaymentSuccess}); 
            });
        });
    }else{
        modal.discount_amount = 0;
        modal.offer_id = null;
        self.addUpdateOrderPrice(modal, function(err, status, addPriceResult){
            if(err){
                logger.error("Error adding order price (add())"+err)
                return cb(err,responseCodes.INTERNAL_SERVER_ERROR)     
            }
            paymentService.createDirectOrderPayment(modal, function(err,status, result){
                if(err){
                    logger.error("error adding order payment (applyCouponAndPayment())"+err);
                    return cb(err,status);
                }
                return cb(null, responseCodes.SUCCESS, {"message":messages.orderPaymentSuccess}); 
            });
        });
    }
    
}
/*********************************Get List End************************************************/

OrderService.prototype.addUpdateOrderPrice = function(modal, cb){
    logger.info("Add update order price service called (addUpdateOrderPrice())");
    orderDao.addUpdateOrderPrice(modal,function(err, result){
        if(err){
            logger.error("Error adding order price (addUpdateOrderPrice())"+err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }
        return cb(null, responseCodes.SUCCESS, result);
    })
}

OrderService.prototype.getOrderPrice = function(modal, cb){
    logger.info("Get order price service called (getOrderPrice())");
    orderDao.getOrderPrice(modal,function(err, result){
        if(err){
            logger.debug("Error getting order price (getOrderPrice())"+err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }
        if(result && result.length>0){
            return cb(null, responseCodes.SUCCESS, result[0]);
        }else{
            return cb(messages.orderPriceNotFound, responseCodes.NOT_FOUND);
        }
    });
}



module.exports = OrderService;
