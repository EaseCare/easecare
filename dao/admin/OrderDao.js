"use strict";

var moduleName = __filename;
var cache = require('service/cache').local;
var logger = require('helper/Logger.js')(moduleName);

var connection = require('service/mysql/Pool.js');

var OrderDao = function () { }

OrderDao.prototype.createOrder = function(data, cb){
    logger.debug("Create order info method call start (createOrder())");
    var date = utilDao.getMySqlFormatDateTime(null);
    var queryData = {
        status: 2,
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