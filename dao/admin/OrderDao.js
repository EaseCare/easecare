"use strict";

var moduleName = __filename;
var cache = require('service/cache').local;
var logger = require('helper/Logger.js')(moduleName);

var connection = require('service/mysql/Pool.js');
var utilDao = require('dao/util/UtilDao.js');
var OrderDao = function () { }

OrderDao.prototype.add = function(data, cb){
    logger.debug("Create order dao call start (add())");
    var date = utilDao.getMySqlFormatDateTime(null);
    var queryData = {
        status: data.status||2,
        is_cart: data.is_cart||0,
        user_id: data.logged_in_user.user_id,
        created_date: date,
        edited_date: date,
        created_by: data.logged_in_user.user_id,
        edited_by: data.logged_in_user.user_id
    };
    var query = [];
    query.push(" INSERT INTO `order` SET ? ");
    query = query.join(" ");
    
    var mySqlQuery = connection.query(query, [queryData], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("create order query = " + mySqlQuery.sql);
}
OrderDao.prototype.addUpdateOrderPrice = function(data, cb){
    logger.debug("Add update order price dao call start (add())");
    var date = utilDao.getMySqlFormatDateTime(null);
    var payableAmout = data.payable_amount;
    if(payableAmout){
        
    }else{
        var amount = data.amount||data.price||data.total;
        var discount = data.discount_amount||0;
        payableAmout = amount - discount;
    }
    var queryData = {
        order_id: data.order_id,
        total: data.amount||data.price,
        discount_amount: data.discount_amount,
        offer_id: data.offer_id,
        payable_amount: payableAmout,
        created_date: date,
        edited_date: date,
        created_by: data.logged_in_user.user_id,
        edited_by: data.logged_in_user.user_id
    };
    var updateData = {};
    if(data.amount||data.price){
        updateData.total = data.amount||data.price;
    }
    if(data.order_id){
        updateData.order_id = data.order_id;
    }
    if(data.discount_amount){
        updateData.discount_amount = data.discount_amount;
    }
    if(data.offer_id){
        updateData.offer_id = data.offer_id;
    }
    if(payableAmout){
        updateData.payable_amount = payableAmout;
    }
    updateData.edited_date = date;
    updateData.edited_by = data.logged_in_user.user_id;
    var query = [];
    query.push(" INSERT INTO `order_price` SET ? ON DUPLICATE KEY UPDATE ?");
    query = query.join(" ");
    
    var mySqlQuery = connection.query(query, [queryData,updateData], function (err, resultSet) {
        if (err) {
            logger.error("Error in query"+JSON.stringify(err));
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("add update order price query = " + JSON.stringify(mySqlQuery));
}

OrderDao.prototype.getOrderPrice = function(data, cb){
    logger.debug("Get order price dao call start (getDetail())");
    
    var query = [];
    query.push(" select * from order_price where order_id = ? ");
    query = query.join(" ");
    
    var mySqlQuery = connection.query(query, [data.order_id], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("get order price query = " + mySqlQuery.sql);
}

module.exports = OrderDao;