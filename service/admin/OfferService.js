"use strict";

var moduleName = __filename;
var logger = require('helper/Logger.js')(moduleName);
var config = require('config');
var responseCodes = config.responseCode;
var messages = config.messages;
var offerDao = new (require('dao/admin/OfferDao.js'))();
var orderDao = new (require('dao/admin/OrderDao.js'))();
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
            orderDao.addUpdateOrderPrice(modal,function(err, result){
                if(err){
                    logger.debug("Error adding order price (applyCoupen())"+err);
                    return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
                }
                orderDao.getOrderPrice(modal,function(err, result){
                    if(err){
                        logger.debug("Error getting order price (applyCoupen())"+err);
                        return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
                    }
                    if(result && result.length>0){
                        var output = {};
                    output.new_price = result[0].payable_amount;
                    output.old_price = result[0].total;
                    output.discount_amount = result[0].discount_amount;
                    return cb(null, responseCodes.SUCCESS, output);
                        //return cb(null, responseCodes.SUCCESS, result[0]);
                    }else{
                        return cb(messages.orderPriceNotFound, responseCodes.NOT_FOUND);
                    }
                })
            });
           /* orderService.addUpdateOrderPrice(modal, function(err, status, result){
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
            });*/
        });
    });
}
OfferService.prototype.applyCouponApi = function(modal, cb){
    logger.info("Apply coupon service called (applyCouponApi())");
    var self = this;
    self.getDetail(modal, function(err, status, result){
        if(err){
            return cb(err, status);
        }
        modal.id = result.id;
        offerDao.userOffer(modal, function(err,userOfferResult){
            if(err){
               logger.error("Error getting user offer"+err);
               return cb(err, responseCodes.INTERNAL_SERVER_ERROR); 
            }
            if(userOfferResult && userOfferResult.length>0){
                logger.error("Offer already applied");
                return cb(messages.offerAlreadyApplied, responseCodes.UNPROCESSABLE);
            }else{
                var output = {};
                output.id = result.id;
                output.discount_amount = result.discount;
                output.payable_amount = Number(modal.total_price) - Number(result.discount);
                output.total_price = modal.total_price;
                return cb(null, responseCodes.SUCCESS, output);
            }
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
