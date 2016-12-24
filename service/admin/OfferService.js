"use strict";

var moduleName = __filename;
var logger = require('helper/Logger.js')(moduleName);
var config = require('config');
var responseCodes = config.responseCode;
var messages = config.messages;
var offerDao = new (require('dao/admin/OfferDao.js'))();
var orderService = new (require('service/admin/OrderService.js'))();
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

OfferService.prototype.applyCoupon = function(modal, cb){
    logger.info("Apply coupon service called (applyCoupen())");
    var self = this;
    self.getDetail(modal, function(err, status, result){
        if(err){
            return cb(err, status);
        }
        modal.offer_id = result.id;
        offerDao.applyOffer(modal, function(err, offerResult){
            if(err ){
                if(err.code === "ER_DUP_ENTRY"){
                    logger.error("Offer already applied"+err);
                    return cb(messages.offerAlreadyApplied, responseCodes.UNPROCESSABLE); 
                }else{
                    logger.error("Error apply offer to user order"+err);
                    return cb(err, responseCodes.INTERNAL_SERVER_ERROR); 
                } 
            }
            modal.discount_amount = result.discount;
            modal.payable_amount = Number(modal.total_price) - Number(result.discount);
            orderService.addUpdateOrderPrice(modal, function(err, status, result){
                if(err){
                    logger.error("Error apply offer to user order"+err);
                    return cb(err, responseCodes.INTERNAL_SERVER_ERROR)
                }
                orderService.getOrderPrice(modal, function(err, status, finalResult){
                    if(err){
                        logger.error("Error get order price"+err);
                        return cb(err, status);
                    }
                    var output = {};
                    output.new_price = finalResult.payable_amount;
                    output.old_price = finalResult.total;
                    output.discount_amount = finalResult.discount_amount;
                    return cb(null, responseCodes.SUCCESS, output);
                });
            });
        });
    });
}

OfferService.prototype.getDetail = function(modal, cb){
    logger.info("Get Offer Detail service called (getDetail())");
    var self = this;
    
    offerDao.getDetail(modal, function(err, entities){
        if(err){
            logger.error("Error in get offer detail (getDetail())"+err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }
        if(entities && entities.length>0){
            return cb(null, responseCodes.SUCCESS, entities[0]);
        }else{
            return cb(messages.offerNotFound, responseCodes.NOT_FOUND);
        }
        
    })
}
module.exports = OfferService;
