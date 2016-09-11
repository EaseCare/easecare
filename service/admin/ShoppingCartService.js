"use strict";
var lodash = require("lodash");
var moduleName = __filename;
var logger = require('helper/Logger.js')(moduleName);
var config = require('config');
var responseCodes = config.responseCode;
var messages = config.messages;
var shoppingCartDao = new (require('dao/admin/ShoppingCartDao.js'))();
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
        if(entities && entities.length>0){
            try{
                var result = JSON.parse(entities);
            }catch(error){
                logger.error("Error in parsing shoppingCart list (getList()) " + error);
                return cb(error, responseCodes.INTERNAL_SERVER_ERROR);
            }
            return cb(null, responseCodes.SUCCESS, entities);
        }else{
            return cb(null, responseCodes.SUCCESS, []);
        }
    });
};
/*********************************Get List End************************************************/

/*********************************Add Start************************************************/
ShoppingCartService.prototype.add = function (modal, cb) {
    logger.info("ShoppingCart add service called (add())");
    var self = this;
    //var cart = lodash.omit(modal, ['logged_in_user']);
    var cart = JSON.stringify(modal,function(key,value){
        if(key === 'logged_in_user'){
            return undefined;
        }
        return value;
    });
    modal.cart = cart;
    shoppingCartDao.add(modal, function (err, result) {
        if (err) {
            logger.error("Error in add shoppingCart (add()) " + err);
            return cb(err, responseCodes.INTERNAL_SERVER_ERROR);
        }
        self.getList(modal,function(err,code,output){
            return cb(err,code,output);
        })
    });
};
/*********************************Add End************************************************/


module.exports = ShoppingCartService;
