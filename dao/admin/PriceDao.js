"use strict";

var moduleName = __filename;
var cache = require('service/cache').local;
var logger = require('helper/Logger.js')(moduleName);

var connection = require('service/mysql/Pool.js');

var LabDao = function () { }

LabDao.prototype.getTestPrice = function (data, cb) {
    logger.debug("lab get list method call start (getList())");
    var query = [];
    query.push(" SELECT lt.price ");
    query.push(" FROM lab_test as lt ");
    query.push(" INNER JOIN lab as l on l.id = lt.lab_id ");
    query.push(" INNER JOIN test as t on t.id = lt.test_id ");
    query = query.join("");


    var mySqlQuery = connection.query(query, function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("Get Item Price query = " + mySqlQuery.sql);
}

module.exports = LabDao;