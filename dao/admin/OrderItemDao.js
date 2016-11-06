"use strict";

var moduleName = __filename;
var cache = require('service/cache').local;
var logger = require('helper/Logger.js')(moduleName);

var connection = require('service/mysql/Pool.js');
var utilDao = require('dao/util/UtilDao.js');
var OrderItemDao = function () { }

OrderItemDao.prototype.add = function(data, cb){
    logger.debug("Create order item dao call start (add())");
    var date = utilDao.getMySqlFormatDateTime(null);
    var queryData = {
        status_id: data.status_id||1,
        test_id: data.test_id,
        lab_id: data.lab_id,
        order_id: data.order_id,
        appointment_date: data.appointment_date,
        price: data.price,
        created_date: date,
        edited_date: date,
        created_by: data.logged_in_user.user_id,
        edited_by: data.logged_in_user.user_id
    };
    var query = [];
    query.push(" INSERT INTO `order_item` SET ? ");
    query = query.join(" ");
    
    var mySqlQuery = connection.query(query, [queryData], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("create order item query = " + mySqlQuery.sql);
}
OrderItemDao.prototype.addOrderItemStatus = function(data, cb){
    logger.debug("Create order item status dao call start (addOrderItemStatus())");
    var date = utilDao.getMySqlFormatDateTime(null);
    var queryData = {
        status_id: data.status_id||1,
        order_item_id: data.order_item_id,
        created_date: date,
        edited_date: date,
        created_by: data.logged_in_user.user_id,
        edited_by: data.logged_in_user.user_id
    };
    var query = [];
    query.push(" INSERT INTO `order_item_status_change` SET ? ");
    query = query.join(" ");
    
    var mySqlQuery = connection.query(query, [queryData], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("create order item status query = " + mySqlQuery.sql);
    
}
OrderItemDao.prototype.removeOrderItemStatus = function(data, cb){
    logger.debug("Remove order item status (removeOrderItemStatus())");
    
    var query = [];
    query.push(" Delete from `order_item_status_change` WHERE order_item_id = ? ");
    query = query.join(" ");
    
    var mySqlQuery = connection.query(query,[data.id], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("remove order item status query = " + mySqlQuery.sql);
}
module.exports = OrderItemDao;