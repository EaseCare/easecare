"use strict";

var moduleName = __filename;
var cache = require('service/cache').local;
var logger = require('helper/Logger.js')(moduleName);

var connection = require('service/mysql/Pool.js');
var utilDao = require('dao/util/UtilDao.js');
var OrderItemDao = function () { }

OrderItemDao.prototype.add = function(data, cb){
    logger.debug("Create order item dao call start (add())"+JSON.stringify(data));
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
            logger.error("Error in adding item to cart "+err);
            return cb(err);
        }
        logger.debug("Result adding item to cart "+resultSet);
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
OrderItemDao.prototype.getOrderItemStatus = function(data, cb){
    logger.debug("Get order item status dao service called (getOrderItemStatus())");
    
    var query = [];
    query.push(" select "); 
    query.push(" oi.id as order_item_id "); 
    query.push(" ,t.name as test_name ");
    query.push(" ,l.name as lab_name ");
    query.push(" ,ois.name as test_state ");
    query.push(" ,oisc.created_date as test_state_created_date ");
    query.push(" from order_item as oi "); 
    query.push(" inner join `order` as o on o.id = oi.order_id "); 
    query.push(" inner join test as t on t.id = oi.test_id ");
    query.push(" inner join lab as l on l.id = oi.lab_id ");
    query.push(" inner join order_item_status_change as oisc on oi.id = oisc.order_item_id and oisc.status_id = oi.status_id ");
    query.push(" inner join order_item_status as ois on ois.id = oi.status_id ");
    query.push(" where o.user_id = ? ");
    
    query = query.join(" ");
    
    var mySqlQuery = connection.query(query,[data.logged_in_user.user_id], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("Get order item status query = " + mySqlQuery.sql);
}

OrderItemDao.prototype.updateLab = function(data, cb){
    logger.debug("Update order item dao call start (updateLab())"+JSON.stringify(data));
    var date = utilDao.getMySqlFormatDateTime(null);
    var queryData = {
        lab_id: data.lab_id,
        price: data.price,
        edited_date: date,
        edited_by: data.logged_in_user.user_id
    };
    var query = [];
    query.push(" UPDATE `order_item` SET ? where id = ?");
    query = query.join(" ");
    
    var mySqlQuery = connection.query(query, [queryData,data.id], function (err, resultSet) {
        if (err) {
            logger.error("Error in adding item to cart "+err);
            return cb(err);
        }
        logger.debug("Result update lab "+JSON.stringify(queryData)+data.id);
        return cb(null, resultSet);
    });
    logger.debug("create order item query = " + mySqlQuery.sql);
}

OrderItemDao.prototype.getOrderPriceFromOrderItem = function(data, cb){
    logger.debug("Get order price from order item dao call start (getOrderPriceFromOrderItem())");
    
    var query = [];
    query.push(" select sum(price) as total_price from order_item where order_id = ? ");
    query = query.join(" ");
    
    var mySqlQuery = connection.query(query, [data.order_id], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("get order price query = " + mySqlQuery.sql);
}
module.exports = OrderItemDao;