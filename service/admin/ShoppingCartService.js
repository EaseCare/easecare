"use strict";
var lodash = require("lodash");
var moduleName = __filename;
var logger = require('helper/Logger.js')(moduleName);
var config = require('config');
var responseCodes = config.responseCode;
var messages = config.messages;
var shoppingCartDao = new (require('dao/admin/ShoppingCartDao.js'))();
var utilService = new (require('service/util/UtilService.js'))();
var orderItemService = new (require('service/admin/OrderItemService.js'))();
//var orderService = new (require('service/admin/OrderService.js'))();
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
    shoppingCartDao.getCartOrder(modal, function (err, result) {
        if (err) {
            logger.error("Error in get cart order(add()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }
        var order_id = null;
        if (result && result.length > 0) {
            order_id = result[0].id;
            modal.order_id = order_id;
            orderItemService.add(modal,function(err, code, orderItemOutput){
                if(err){
                    logger.error("Error in add order item to cart(add()) " + err);
                    return cb(err, code);
                }  
                orderItemService.getOrderPriceFromOrderItem(modal, function(err, code, price){
                    if(err){
                        logger.error("Error in get order price"+err);
                        return cb(messages.orderPriceNotFound, responseCodes.INTERNAL_SERVER_ERROR);
                    }
                    modal.amount = price;
                    orderItemService.addUpdateOrderPrice(modal, function(err, status, code){
                        if(err){
                            logger.error("Error add or update price"+err);
                            return cb(err, status);
                        }
                        self.getList(modal, function (err, code, output) {
                            return cb(err, code, output);
                        });
                    });
                }) ; 
            });
        } else {
            shoppingCartDao.createCartOrder(modal, function (err, result) {
                if (err) {
                    logger.error("Error in create get cart order(add()) " + err);
                    return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
                }
                order_id = result.insertId;
                modal.order_id = order_id;
                orderItemService.add(modal,function(err, code, orderItemOutput){
                    if(err){
                        logger.error("Error in add order item to cart(add()) " + err);
                        return cb(err, code);
                    }   
                    orderItemService.getOrderPriceFromOrderItem(modal, function(err, code, price){
                        if(err){
                            logger.error("Error in get order price"+err);
                            return cb(messages.orderPriceNotFound, responseCodes.INTERNAL_SERVER_ERROR);
                        }
                        modal.amount = total_price;
                        orderItemService.addUpdateOrderPrice(modal, function(err, status, code){
                            if(err){
                                logger.error("Error add or update price"+err);
                                return cb(err, status);
                            }
                            self.getList(modal, function (err, code, output) {
                                return cb(err, code, output);
                            });
                        });
                    }) ;  
                });
            });
        }
    });
};
ShoppingCartService.prototype.updateCartTestLabs = function(data, cb){
    logger.info("Shopping Cart update Cart Test labs service called (updateCartTestLabs())");
    var self = this;
    self.getList(data, function(err, status, result){
        if(err){
            return cb(err, status);
        }
        if(result && result.order_items.length>0){
            var counter = 0;
            (result.order_items).forEach(function(order_item){
                var inputData = {};
                inputData.id = order_item.order_item_id;
                inputData.test_id = order_item.testData.id;
                inputData.lab_id = data.lab_id;
                inputData.logged_in_user = data.logged_in_user;
               orderItemService.updateLab(inputData, function(err, status, out){
                   counter++;
                   if(err){
                       logger.error("Error during update order item"+err);
                       return cb(err, status);
                   }
                   if((result.order_items).length === counter){
                       self.getList(data, function(err, status, result){
                            if(err){
                                return cb(err, status);
                            }
                            return cb(null, status, result);     
                       });
                   }
               });
            })
        }else{
            return cb(messages.emptyCart, responseCodes.UNPROCESSABLE);
        }
    })
}
ShoppingCartService.prototype.addOrderItem = function(data,cb){
     logger.info("ShoppingCart add order_item to cart service called (addOrderItem())");
    shoppingCartDao.addOrderItem(data,function(err,result){
        if (err) {
            logger.error("Error in add order Item to cart(addOrderItem()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }
        return cb(null, responseCodes.SUCCESS, result);
    });
}
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
        topReview.full_name = entity.r_user_full_name;
        topReview.user_id = entity.r_user_id;

        labData.id = entity.lab_id;
        labData.name = entity.lab_name;
        labData.price = entity.test_price;
        labData.image = entity.lab_image;
        labData.address = address;
        labData.top_review = topReview;
        responseObject.order_item_id = entity.id
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
    shoppingCartDao.getCartOrder(modal, function (err, result) {
        if (err) {
            logger.error("Error in get cart order(removeUserCart()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }
        var order_id = null;
        if (result && result.length > 0) {
            order_id = result[0].id;
            modal.order_id = order_id;
            shoppingCartDao.removeUserCartOrderItem(modal, function(err,result){
                if(err){
                    logger.error("Error in remove shoppingCart item (removeUserCart()) " + err);
                    return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
                }
                shoppingCartDao.removeUserCartOrder(modal, function (err, result) {
                    if (err) {
                        logger.error("Error in remove shoppingCart order (removeUserCart()) " + err);
                        return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
                    }
                    return cb(null,responseCodes.SUCCESS,{message:messages.cartRemove});
                });
            });
        }else{
            logger.debug("user cart is already empty (removeUserCart())");
            return cb(messages.emptyCart,responseCodes.FORBIDDEN);
        }
    });
}
ShoppingCartService.prototype.removeUserCartItem = function(modal,cb){
    logger.info("ShoppingCart remove cart item service called (remove())");
    shoppingCartDao.getCartOrder(modal, function (err, result) {
        if (err) {
            logger.error("Error in get cart order(remove()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }
        if (result && result.length > 0) {
            modal.id = modal.order_item_id ;
            shoppingCartDao.removeUserCartOrderItem(modal, function (err, result) {
                if (err) {
                    logger.error("Error in remove shoppingCart (remove()) " + err);
                    return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
                }
                logger.debug("the remove object"+JSON.stringify(result));
                if(result.affectedRows>0){
                    return cb(null,responseCodes.SUCCESS,{message:messages.cartItemRemove});
                }else{
                    return cb(messages.orderItemNotFoundInCart, responseCodes.NOT_FOUND);
                }
            });
        }else{
            logger.debug("user cart is already empty (remove())");
            return cb(messages.emptyCart,responseCodes.FORBIDDEN);
        }
    });
}

ShoppingCartService.prototype.completeCart = function(modal, cb){
    logger.info("Complete user cart service called (completeCart())");
    shoppingCartDao.completeCart(modal, function(err, result){
       if(err){
         logger.error("Eror in complete user cart (completeCart())"+err);
         return cb(err, responseCodes.INTERNAL_SERVER_ERROR);  
       } 
       return cb(null, responseCodes.SUCCESS, result);
    });
}
module.exports = ShoppingCartService;
