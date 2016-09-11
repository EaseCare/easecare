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
    query.push(" SELECT cart from cart where user_id = ?");
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
        cart: data.cart,
        user_id: data.logged_in_user.user_id,
        created_date: date,
        edited_date: date,
        created_by: data.logged_in_user.user_id,
        edited_by: data.logged_in_user.user_id
    };

    var query = [];
    query.push(" INSERT INTO cart SET ? ON DUPLICATE KEY UPDATE ?");
    query = query.join("");

    var mySqlQuery = connection.query(query, [queryData,queryData], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("shoppindCart add query = " + mySqlQuery.sql);
}

module.exports = ShoppingCartDao;