"use strict";

var moduleName = __filename;
var logger = require('helper/Logger.js')(moduleName);
var config = require('config');
var responseCodes = config.responseCode;
var messages = config.messages;
var orderItemDao = new (require('dao/admin/OrderItemDao.js'))();
var orderDao = new (require('dao/admin/OrderDao.js'))();
var utilService = new (require('service/util/UtilService.js'))();
var priceService = new (require('service/admin/PriceService.js'))();
var OrderItemService = function () { };

/*********************************Get List Start************************************************/
OrderItemService.prototype.add = function (modal, cb) {
    logger.info("add order item service called (add())");
    var self = this;
    var appointment_date = modal.appointment_date;
    modal.appointment_date = utilService.formatDateTime(appointment_date);
    priceService.getTestPrice(modal,function(err,status,price){
        if(err){
            logger.error("Error in get test price (add())"+err);
            return cb(err, status);
        }
        modal.price = price;
        orderItemDao.add(modal, function (err, result) {
            if (err) {
                logger.error("Error in add order item (add()) " + err);
                return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
            }
            var order_item_id = result.insertId;
            modal.order_item_id = order_item_id;
            self.addOrderItemStatus(modal,function(err, code, statusResult){
                if(err){
                    logger.error("Error in add order item status (add()) " + err);
                    return cb(err, code);
                }
                return cb(null, responseCodes.SUCCESS, result); 
            });
        });
    });
};
OrderItemService.prototype.updateLab = function(modal, cb){
    logger.info("add order item service called (add())"+JSON.stringify(modal));
    var self = this;
    priceService.getTestPrice(modal,function(err,status,price){
        if(err){
            logger.error("Error in get test price (add())"+err);
            return cb(err, status);
        }
        modal.price = price;
        orderItemDao.updateLab(modal, function (err, result) {
            if (err) {
                logger.error("Error in add order item (add()) " + err);
                return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
            }
            return cb(null, responseCodes.SUCCESS, result); 
        });
    });
};
/*********************************Get List End************************************************/
OrderItemService.prototype.addOrderItemStatus = function (modal, cb) {
    logger.info("add order item status service called (addOrderItemStatus())");
    orderItemDao.addOrderItemStatus(modal, function (err, result) {
        if (err) {
            logger.error("Error in add order item status (addOrderItemStatus()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }
        return cb(null, responseCodes.SUCCESS, result); 
    });
}
OrderItemService.prototype.getOrderItemStatus = function (modal, cb) {
    logger.info("Get order item status service called (getOrderItemStatus())");
    orderItemDao.getOrderItemStatus(modal, function (err, result) {
        if (err) {
            logger.error("Error in get order item status (getOrderItemStatus()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }
        return cb(null, responseCodes.SUCCESS, result); 
    });
}
OrderItemService.prototype.getOrderPriceFromOrderItem = function(modal, cb){
    logger.info("Get order price from order Item (getOrderPriceFromOrderItem())");
    orderItemDao.getOrderPriceFromOrderItem(modal, function(err, result){
        if(err){
            logger.debug("Error getting order price (getOrderPriceFromOrderItem())"+err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }
        if(result && result.length>0){
            return cb(null, responseCodes.SUCCESS, result[0].total_price);
        }else{
            return cb(messages.orderPriceNotFound, responseCodes.NOT_FOUND);
        }
    });
}

OrderItemService.prototype.addUpdateOrderPrice = function(modal, cb){
    logger.info("Add update order price service called (addUpdateOrderPrice())");
    orderDao.addUpdateOrderPrice(modal,function(err, result){
        if(err){
            logger.debug("Error adding order price (addUpdateOrderPrice())"+err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }
        return cb(null, responseCodes.SUCCESS, result);
    })
}
module.exports = OrderItemService;
