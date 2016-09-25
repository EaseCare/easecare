"use strict";

var moduleName = __filename;
var cache = require('service/cache').local;
var logger = require('helper/Logger.js')(moduleName);

var connection = require('service/mysql/Pool.js');
var utilDao = require('dao/util/UtilDao.js');

var ShoppingCartDao = function () { }

ShoppingCartDao.prototype.getList = function (data, cb) {
    logger.debug("shoppingCart get list method call start (getList())");
    var query = [];
    query.push(" select c.test_id,c.lab_id,c.user_id,c.created_date as cart_date ");
    query.push(" ,o.id AS order_id,t.name as test_name ");
    query.push(" ,l.name as lab_name,i.path as lab_image ");
    query.push(" ,a.address_line_1,a.address_line_2,a.city,a.state,a.latitude,a.longitude ");
    query.push(" ,lt.price as test_price ");
    query.push(" ,ur.review,ur.created_date as r_created_date ");
    query.push(" ,ru.id as r_user_id,ru.first_name as r_user_first_name,ru.last_name as r_user_last_name ");
    query.push(" ,ri.path as r_user_image ");
    query.push(" from user as u ");
    query.push(" inner join cart as c on c.user_id = u.id ");
    query.push(" inner join test as t on t.id = c.test_id ");
    query.push(" inner join lab as l on l.id = c.lab_id ");
    query.push(" inner join address as a on a.id = l.address_id ");
    query.push(" inner join lab_test as lt on l.id = lt.lab_id AND t.id = lt.test_id "); 
    query.push(" inner join image as i on i.id = l.image_id ");
    query.push(" inner join user_rating as ur on ur.lab_id = l.id AND ur.created_date = ( ");
    query.push(" SELECT MAX(created_date) as reviewCreatedDate ");
    query.push(" FROM user_rating ");
    query.push(" GROUP BY lab_id ");
    query.push(" )  ");
    query.push(" inner join user as ru on ru.id = ur.user_id ");
    query.push(" inner join `order` as o ON o.user_id = u.id ");
    query.push(" left outer join image as ri on ri.id = ru.image_id ");
    query.push(" where c.user_id = 1 ");
    query.push(" group by c.test_id ");
    query = query.join("");


    var mySqlQuery = connection.query(query,[data.logged_in_user.user_id], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("shoppindCart get query = " + mySqlQuery.sql);
}

ShoppingCartDao.prototype.add = function (data, cb) {
    logger.debug("shoppingCart add method call start (add())");
    var date = utilDao.getMySqlFormatDateTime(null);
    var queryData = {
        test_id: data.test_id,
        lab_id: data.lab_id,
        appointment_date: data.appointment_date,
        user_id: data.logged_in_user.user_id,
        created_date: date,
        edited_date: date,
        created_by: data.logged_in_user.user_id,
        edited_by: data.logged_in_user.user_id
    };

    var query = [];
    query.push(" INSERT INTO cart SET ? ");
    query = query.join("");

    var mySqlQuery = connection.query(query, [queryData], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("shoppindCart add query = " + mySqlQuery.sql);
}
ShoppingCartDao.prototype.getCartOrder = function(data, cb){
    logger.debug("Get order info method call start (getCartOrder())");
    var query = [];
    query.push(" SELECT id ");
    query.push(" FROM `order` ");
    query.push(" WHERE user_id = ? and status=1 ");
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
        status:1,
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
ShoppingCartDao.prototype.removeUserCart = function(data, cb){
    logger.debug("Create order info method call start (createCartOrder())");
    var query = [];
    query.push(" Delete from `cart` WHERE user_id = ? ");
    query = query.join(" ");
    
    var mySqlQuery = connection.query(query, [data.logged_in_user.user_id], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("remove cart object = " + mySqlQuery.sql);
}
module.exports = ShoppingCartDao;