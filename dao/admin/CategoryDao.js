"use strict";

var moduleName = __filename;
var cache = require('service/cache').local;
var logger = require('helper/Logger.js')(moduleName);

var connection = require('service/mysql/Pool.js');

var CategoryDao = function () { }

CategoryDao.prototype.getList = function (data, cb) {
    logger.debug("category get list method call start (getList())");
    var query = [];
    query.push(" SELECT * from category ");
    query = query.join("");


    var mySqlQuery = connection.query(query, function (err, resultSet) {
        if (err) {
            return cb(err);
        }
        return cb(null, resultSet);
    });
    logger.debug("login query = " + mySqlQuery.sql);
}

module.exports = CategoryDao;