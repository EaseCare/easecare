"use strict";

var moduleName = __filename;
var cache = require('service/cache').local;
var logger = require('helper/Logger.js')(moduleName);

var connection = require('service/mysql/Pool.js');

var PaymentDao = function () { }

PaymentDao.prototype.getList = function (data, cb) {
    logger.debug("payment get list method call start (getList())");
    var query = [];
    query.push(" SELECT * from payment ");
    query = query.join("");


    var mySqlQuery = connection.query(query, function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("payment get query = " + mySqlQuery.sql);
}

PaymentDao.prototype.createOrderPayment = function (data, cb) {
    logger.debug("order payment create method call start (createOrderPayment())");
    var date = utilDao.getMySqlFormatDateTime(null);
    var queryData = {
        order_id: data.order_id,
        payment_id: data.payment_id,
        transaction_id: data.transaction_id,
        amount:data.amount,
        created_date: date,
        edited_date: date,
        created_by: data.logged_in_user.user_id,
        edited_by: data.logged_in_user.user_id
    };
    var query = [];
    query.push(" INSERT INTO order_payment SET ? ");
    query = query.join("");


    var mySqlQuery = connection.query(query,[queryData], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("create order payment query = " + mySqlQuery.sql);
}

module.exports = PaymentDao;