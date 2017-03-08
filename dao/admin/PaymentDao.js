"use strict";

var moduleName = __filename;
var cache = require('service/cache').local;
var logger = require('helper/Logger.js')(moduleName);

var connection = require('service/mysql/Pool.js');
var utilDao = require('dao/util/UtilDao.js');
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
PaymentDao.prototype.getOrdersPayment = function(data, cb){
    logger.debug("Get Order Payment dao call start (getOrdersPayment())");
    
    var query = [];
    query.push(" SELECT ");  
    query.push(" o.id as order_id, o.created_date as order_date  ");
    query.push(" ,if(o.is_cart = 0,0,1) as is_cart  ");
    query.push(" ,if(op.id is null,'NOT_PAID','PAID') as payment_status ");
    query.push(" ,op.amount as payment_price ");
    query.push(" ,p.id as payment_mode ");
    query.push(" From `order` as o ");  
    query.push(" left join order_payment as op on op.order_id = o.id ");
    query.push(" left join payment as p on p.id = op.payment_id ")
    query.push(" where o.user_id = ? ");
    query = query.join("");

    var mySqlQuery = connection.query(query,[data.logged_in_user.user_id], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("create order payment query = " + mySqlQuery.sql);
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
PaymentDao.prototype.createOrderAddress = function(data, cb){
    logger.debug("Create order address method call start (createOrderAddress())");
    var date = utilDao.getMySqlFormatDateTime(null);
    var queryData = {
        full_name:data.full_name,
        mobile_number:data.mobile_number,
        address:data.address,
        landmark:data.landmark,
        gender:data.gender,
        order_id:data.order_id,
        created_date: date,
        edited_date: date,
        created_by: data.logged_in_user.user_id,
        edited_by: data.logged_in_user.user_id
    };
    var query = [];
    query.push(" INSERT INTO `order_address` SET ? ");
    query = query.join(" ");
    
    var mySqlQuery = connection.query(query, [queryData], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("create order address query = " + mySqlQuery.sql);
}
PaymentDao.prototype.getOrderDetailForPayment = function(data, cb){
    logger.debug("Get order detail for payment dao called (getOrderDetailForPayment())"+JSON.stringify(data));
    
     var query = [];
    query.push(" SELECT "); 
    query.push(" `order`.id , `order`.user_id ");
    query.push(" ,`order_price`.payable_amount ");
    query.push(" from `order` ");
    query.push(" inner join `order_price` on `order_price`.order_id = `order`.id ");
    query.push(" where `order`.id = ? ");/*and user_id = ? ");*/

    query = query.join("");

    var mySqlQuery = connection.query(query,[data.id], function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("create order payment query = " + mySqlQuery.sql);
    
}

module.exports = PaymentDao;