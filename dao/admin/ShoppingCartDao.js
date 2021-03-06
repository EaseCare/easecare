"use strict";

var moduleName = __filename;
var cache = require('service/cache').local;
var logger = require('helper/Logger.js')(moduleName);

var connection = require('service/mysql/Pool.js');
var utilDao = require('dao/util/UtilDao.js');
var orderItemDao = new (require('dao/admin/OrderItemDao.js'))();
var ShoppingCartDao = function () { }

ShoppingCartDao.prototype.getList = function (data, cb) {
    logger.debug("shoppingCart get list method call start (getList())");
    var query = [];
    query.push(" select oi.id,oi.test_id,oi.lab_id,o.user_id,oi.created_date as cart_date ");
    query.push(" ,o.id AS order_id,t.name as test_name ");
    query.push(" ,l.name as lab_name,i.path as lab_image ");
    query.push(" ,a.address_line_1,a.address_line_2,a.city,a.state,a.latitude,a.longitude ");
    query.push(" ,lt.price as test_price ");
    query.push(" ,ur.review,ur.created_date as r_created_date ");
    query.push(" ,ru.id as r_user_id,ru.full_name as r_user_full_name ");
    query.push(" ,ri.path as r_user_image ");
    query.push(" from user as u ");
    query.push(" inner join `order` as o ON o.user_id = u.id ");
    query.push(" inner join `order_item` as oi ON oi.order_id = o.id ");
    query.push(" inner join test as t on t.id = oi.test_id ");
    query.push(" inner join lab as l on l.id = oi.lab_id ");
    query.push(" left join address as a on a.id = l.address_id ");
    query.push(" left join lab_test as lt on l.id = lt.lab_id AND t.id = lt.test_id "); 
    query.push(" left join image as i on i.id = l.image_id ");
    query.push(" left join user_rating as ur on ur.lab_id = l.id ");//AND ur.created_date = ( ");
    //query.push(" SELECT MAX(created_date) as reviewCreatedDate ");
    //query.push(" FROM user_rating ");
    //query.push(" GROUP BY lab_id ");
    //query.push(" )  ");
    query.push(" left join user as ru on ru.id = ur.user_id ");
    query.push(" left outer join image as ri on ri.id = ru.image_id ");
    query.push(" where o.user_id = ? and o.is_cart = 1 ");
    query.push(" group by oi.id ");
    query = query.join("");


    var mySqlQuery = connection.query(query,[data.logged_in_user.user_id], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("shoppindCart get query = " + mySqlQuery.sql);
}

ShoppingCartDao.prototype.addOrderItem = function (data, cb) {
    logger.debug("shoppingCart add method call start (add())");
    var date = utilDao.getMySqlFormatDateTime(null);
    var queryData = {
        test_id: data.test_id,
        lab_id: data.lab_id,
        appointment_date: data.appointment_date,
        price: data.price,
        order_id: data.order_id,
        status_id: data.status_id||1,
        created_date: date,
        edited_date: date,
        created_by: data.logged_in_user.user_id,
        edited_by: data.logged_in_user.user_id
    };

    var query = [];
    query.push(" INSERT INTO order_item SET ? ");
    query = query.join("");

    var mySqlQuery = connection.query(query, [queryData], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("shoppindCart add query = " + mySqlQuery.sql);
}
/*ShoppingCartDao.prototype.remove = function (data, cb) {
    logger.debug("shoppingCart remove method call start (add())");
    var date = utilDao.getMySqlFormatDateTime(null);

    var query = [];
    query.push(" DELETE FROM order_item WHERE test_id = ? AND lab_id = ? AND order_id = ? ");
    query = query.join("");

    var mySqlQuery = connection.query(query, [data.test_id, data.lab_id, data.order_id], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("shoppindCart remove query = " + mySqlQuery.sql);
}*/
ShoppingCartDao.prototype.getCartOrder = function(data, cb){
    logger.debug("Get order info method call start (getCartOrder())");
    var query = [];
    query.push(" SELECT id ");
    query.push(" FROM `order` ");
    query.push(" WHERE user_id = ? and is_cart=1 ");
    query = query.join(" ");
    
    var mySqlQuery = connection.query(query, [data.logged_in_user.user_id], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("get order query = " + mySqlQuery.sql);
    
}
ShoppingCartDao.prototype.createCartOrder = function(data, cb){
    logger.debug("Create order info method call start (createCartOrder())");
    var date = utilDao.getMySqlFormatDateTime(null);
    var queryData = {
        is_cart:1,
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
ShoppingCartDao.prototype.removeUserCartOrderItem = function(data, cb){
    logger.debug("Remove user cart order item (removeUserCartOrderItem())");
    orderItemDao.removeOrderItemStatus(data,function(err,result){
        if (err) {
            return cb(err);
        }
        var query = [];
        query.push(" Delete from `order_item` WHERE id = ? ");
        query = query.join(" ");
        
        var mySqlQuery = connection.query(query,[data.id], function (err, resultSet) {
            if (err) {
                return cb(err);
            }
            return cb(null, resultSet);
        });
        logger.debug("remove user cart order item query = " + mySqlQuery.sql);
    });
    
}

ShoppingCartDao.prototype.removeUserCartOrder = function(data, cb){
    logger.debug("Remove user cart order (removeUserCartOrder())");
    var query = [];
    query.push(" Delete from `order` WHERE is_cart = 1 ");
    query = query.join(" ");
    
    var mySqlQuery = connection.query(query, function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("remove user cart order query = " + mySqlQuery.sql);
}

ShoppingCartDao.prototype.completeCart = function(data, cb){
    logger.debug("Complete user cart order (completeCart())");
    var query = [];
    query.push(" Update `order` SET is_cart = 2 WHERE is_cart = 1 AND user_id = ?");
    query = query.join(" ");
    
    var mySqlQuery = connection.query(query,[data.logged_in_user.user_id], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("complete user cart order query = " + mySqlQuery.sql);
}
module.exports = ShoppingCartDao;