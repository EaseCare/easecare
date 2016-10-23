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
module.exports = OrderDao;